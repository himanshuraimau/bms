import express from 'express';
import { client } from '@repo/db/client';

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;


        const user = await client.user.create({
            data: {
                username,
                password
            }
        });
        res.json({
            message: 'Signup successful!',
            id: user.id
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: 'Signup failed!', error: error });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});