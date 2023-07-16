import fetch from 'node-fetch';
import { Router } from 'express';

const OrderRoute = Router();

OrderRoute.get('/index', (req, res, next) => {
  res.json({ saludo: 'Hola' });
});

const OrderSocket = (io, socket) => {
  const idHandShake = socket.id;
  const { role } = socket.handshake.query;

  socket.join(role);
  console.log("Nuevo cliente: ", idHandShake);

  socket.on('eventox', (res) => {
    fetch('http:localhost:3000/api/order/index', {
      method: 'get',
    })
    .then((response) => response.json())
    .then((response) => {
        console.log("response: ", response);
        socket.to(role).emit('eventox', response);
    }).catch((error) => {
      console.log("error: ", error)
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected: ', idHandShake);
  });
};

export {
    OrderSocket,
    OrderRoute
};
