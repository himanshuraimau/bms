import { WebSocket } from "ws";
import { client } from "@repo/db/client";

const server = new WebSocket.Server({ port: 3001 });

server.on('connection', async (ws) => {
    try {
        await client.user.create({
            data: {
                username: 'test' + Math.random().toFixed(3),
                password: 'test' + Math.random().toFixed(3)
            }
        })
            .then((user) => {
                console.log('User created:', user);
            })
            .catch((error: Error) => {
                console.error('User creation failed:', error);
            });
        ws.send('Hello World!');

        ws.on('message', (message) => {
            console.log('received: %s', message);
            ws.send(`Hello, you sent -> ${message}`);
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    } catch (error) {
        console.error('An error occurred:', error);
        ws.close();
    }
});