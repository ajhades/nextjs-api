import jwt from "jsonwebtoken";
import {serialize} from "cookie";

export default function loginHandler(req, res) {
    const { email, password } = req.body;

    if (!email ||!password) {
        res.status(400).json({
            message: 'Email and password are required'
        });
        return;
    }

    if (email !== 'admin@example.com' && password !== '123456') {
        res.status(401).json({error: 'Invalid email or password'});
    }

    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email: 'admin@example.com',
        username: 'admin',
    }, 'secret')

    const serialized = serialize('myTokenName', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 24 * 30),
        secure: process.env.NODE_ENV !== 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 24 * 30,
        path: '/'
    });

    res.setHeader('Set-Cookie', serialized)
    res.json('login route');
}