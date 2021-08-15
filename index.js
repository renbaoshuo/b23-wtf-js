const http = require('http');
const { URL } = require('url');
const axios = require('axios').default;

const footer = '<hr><div align="center">Made by <a href="https://baoshuo.ren">Baoshuo</a>. Project licensed under GPLv3. <a href="https://github.com/renbaoshuo/b23-wtf-js">Source</a></div>';

const server = http.createServer();
server.on('request', async (request, response) => {
    const url = new URL(request.url, 'http://localhost:8080/');
    const origin = (await axios.get(`https://b23.tv${url.pathname}`)).request._redirectable._currentUrl;
    const origin_url = new URL(origin);
    if (origin_url.host === 'b23.tv') {
        response.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(`<div>Request Failed.</div>${footer}`);
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Location': `https://${origin_url.host}${origin_url.pathname}` });
        response.write(`<div>Success. Redirecting to <a href="https://${origin_url.host}${origin_url.pathname}">https://${origin_url.host}${origin_url.pathname}</a> ...</div>${footer}`);
    }
    response.end();
})
server.listen(8080);

console.log('Server is listening on http://localhost:8080 .');
