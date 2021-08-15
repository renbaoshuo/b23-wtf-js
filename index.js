const http = require('http');
const { URL } = require('url');

/**
 * Page footer
 */
const footer = '<hr><div align="center">Made by <a href="https://baoshuo.ren">Baoshuo</a>. Project licensed under GPLv3. <a href="https://github.com/renbaoshuo/b23-wtf-js">Source</a></div>';

/**
 * Process the link and pass it to user
 * @param {ServerResponse} response 
 * @param {String} track_url 
 */
const success = (response, host, pathname) => {
    response.writeHead(302, { 'Content-Type': 'text/html; charset=utf-8', 'Location': `https://${host}${pathname}` });
    response.write(`<div>Success. Redirecting to <a href="https://${host}${pathname}">https://${host}${pathname}</a> ...</div>${footer}`);
}

/**
 * Throw an exception to user
 * @param {ServerResponse} response 
 */
const error = (response) => {
    response.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(`<div>Request Failed.</div>${footer}`);
}

/**
 * Handle request
 * @param {IncomingMessage} request 
 * @param {ServerResponse} response 
 */
const handleRequest = (request, response) => {
    const client = http.get({ host: 'b23.tv', path: request.url, port: 80 }, (res) => {
        if (res.headers.location) {
            const { host, pathname } = new URL(res.headers.location);
            success(response, host, pathname);
        } else {
            error(response);
        }
        response.end();
    });
    client.on("error", () => {
        error(response);
        response.end();
    });
}

const server = http.createServer();
server.on('request', handleRequest);
server.listen(8080);

console.log('Server is listening on http://localhost:8080 .');
