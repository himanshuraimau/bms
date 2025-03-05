import { WebSocket } from "ws";
import { client } from "@repo/db/client";

const server = new WebSocket.Server({ port: 3001 });

server.on('connection', (ws) => {
    client.user.create({
        data: {
            username: 'test' + Math.random().toFixed(3),
            password: 'test' + Math.random().toFixed(3)
        }
    })
        .then((user: User) => {
            console.log('User created:', user);
        })
        .catch((error: Error) => {
            console.error('User creation failed:', error);
        });
    ws.send('Hello World!');
});