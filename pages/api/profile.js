import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {

    const { myTokenName } = req.cookies;

    if (!myTokenName) {
        res.status(401).json({ error: 'no token' });
    }

    try {
        const user = verify(myTokenName, 'secret')
        res.json({
            email: user.email,
            username: user.username,
        })
    } catch (error) {
        res.status(401).json({ error: 'invalid token' })
    }



}