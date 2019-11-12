var http = require("http");

function onRequest(request, response) {
    console.log("Requête reçue.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}

http.createServer(onRequest).listen(2000);
console.log("Démarrage du serveur.");
