import { z } from 'zod'

export const createTaskSchema = z.object({
    title: z.string({
        required_errror: "Por favor, ingrese un título para la tarea."
    }),
    description: z.string({
        required_error: "Por favor, ingrese una descripción para la tarea."
    }),
    date: z.string({
        required_errror: "Por favor, ingrese una fecha de inicio válida para la tarea."
    }).datetime({
        message: "Por favor, ingrese una fecha de inicio válida para la tarea."
    }).optional()
})