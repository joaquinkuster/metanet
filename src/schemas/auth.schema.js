import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: "Por favor, ingrese un nombre de usuario."
    }), 
    email: z.string({
        required_error: "Por favor, ingrese una dirección de correo electrónico."
    }).email({
        message: "Por favor, ingrese una dirección de correo electrónico válida."
    }), 
    password: z.string({
        required_error: "Por favor, ingrese una contraseña."
    }).min(6, {
        message: "La contraseña debe tenr al menos 6 caracteres de longitud."
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Por favor, ingrese una dirección de correo electrónico."
    }).email({
        message: "Por favor, ingrese una dirección de correo electrónico válida."
    }), 
    password: z.string({
        required_error: "Por favor, ingrese una contraseña."
    })
})