import { WebSocket } from "ws";
import { client } from "@repo/db/client";

const server = new WebSocket.Server({ port: 3001 });

server.on("connection", async (ws) => {

    await client.user.create({
        data: {
            username: "test" + Math.random(),
            password: "test" + Math.random()
        }
    })

    ws.send("Hello from server");


});