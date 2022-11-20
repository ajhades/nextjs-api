import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logoutHandler(req, res) {
    const { myTokenName } = req.cookies;
    if (!myTokenName) {
        res.status(401).json({ error: 'no token' });
    }

    try {
        verify(myTokenName, 'secret');
        const serialized = serialize('myTokenName',null, {
            httpOnly: true,
            expires: 0,
            secure: process.env.NODE_ENV !== 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        })
        res.setHeader('Set-Cookie',serialized);
        res.status(200).json({ success: true, message: 'logout' });
        
    } catch (error) {
        res.status(401).json({ error: 'invalid token' });
    }
}