import { createServer } from "node:http";
import { WebSocketServer, WebSocket } from "ws";

const PORT = Number(process.env.PORT) || 3000;

const httpServer = createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({
    status: "online",
    message: "Servidor de voz funcionando!"
  }));
});

const wss = new WebSocketServer({
  server: httpServer
});

wss.on("connection", (socket: WebSocket) => {
  console.log("Usuário conectado");

  socket.send(JSON.stringify({
    type: "welcome",
    message: "Conectado ao servidor!"
  }));

  socket.on("message", (message) => {
    console.log("Mensagem:", message.toString());
  });

  socket.on("close", () => {
    console.log("Usuário desconectado");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
