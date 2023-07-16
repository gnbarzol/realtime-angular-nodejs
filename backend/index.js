import express from 'express';
import { Server } from 'socket.io';
const app = express();
import { createServer } from 'http';
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

import { OrderSocket, OrderRoute } from './routes/order.js';

app.use('/api/order', OrderRoute);

const onConnection = (socket) => {
  OrderSocket(io, socket);
};

io.on('connection', onConnection);

httpServer.listen(3000, () => {
  console.log('Socket conectado exitosamente');
});
