const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 4782;

const server = http.createServer((req, res) => {
    let decodedUrl;
    try {
        decodedUrl = decodeURIComponent(req.url);
    } catch (e) {
        decodedUrl = req.url;
    }

    const pathname = decodedUrl.split('?')[0];
    let filePath = path.join(__dirname, 'www', pathname === '/' ? 'index.html' : pathname);
    
    const wwwDir = path.join(__dirname, 'www');
    if (!filePath.startsWith(wwwDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Forbidden: Access denied.');
        return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 Not Found</h1><p>ไฟล์ที่ร้องขอไม่มีอยู่จริง</p>', 'utf-8');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`500 Internal Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '127.0.0.1', () => {
    const url = `http://127.0.0.1:${PORT}`;
    console.log(`=========================================`);
    console.log(` TMLT to Lab Catalog Builder & Editor`);
    console.log(`=========================================`);
    console.log(`Server is running at: ${url}`);
    console.log(`Opening default web browser...`);
    console.log(`Keep this window open while using the application.`);
    console.log(`Press Ctrl+C to close the server.`);
    console.log(`=========================================`);
    
    let cmd;
    if (process.platform === 'win32') {
        cmd = `start "" "${url}"`;
    } else if (process.platform === 'darwin') {
        cmd = `open "${url}"`;
    } else {
        cmd = `xdg-open "${url}"`;
    }
    
    exec(cmd, (err) => {
        if (err) {
            console.log(`\nNote: If your browser did not open automatically, please open it manually at: ${url}\n`);
        }
    });
});
