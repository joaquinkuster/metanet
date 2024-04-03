import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAcessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json({message: "La dirección de correo electrónico ingresada ya está en uso. Por favor, ingrese otro correo."})

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            username,
            password: passwordHash
        })

        const userSaved = await newUser.save()

        const token = await createAcessToken({ id: userSaved._id })

        res.cookie('token', token)
        return res.json({
            user: {
                id: userSaved._id,
                username: userSaved.username,
                email: userSaved.email,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt
            },
            message: 'Se ha registrado el usuario correctamente!'
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "El usuario ingresado no existe en la base de datos. Por favor, ingrese otro usuario." })

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "La contraseña ingresada es incorrecta. Por favor, vuelva a intentarlo." })

        const token = await createAcessToken({ id: userFound._id })

        res.cookie('token', token)
        return res.json({
            user: {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt
            },
            message: 'Se ha iniciado sesión correctamente!'
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    })
    return res.status(200).json({
        message: 'Se ha cerrado sesión correctamente!'
    })
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "El usuario ingresado no existe en la base de datos. Por favor, ingrese otro usuario." })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}