import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "No tienes acceso a esta sección. Por favor, inicia sesión para continuar." })

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "El token proporcionado no es válido. Por favor, inicia sesión nuevamente." })
    
        req.user = user

        next()
    })
}