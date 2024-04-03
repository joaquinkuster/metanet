import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id }).populate('user')
    return res.json(tasks)
}

export const getTask = async (req, res) => {
    const taskFound = await Task.findById(req.params.id)
    if (!taskFound) return res.staus(404).json({ message: "La tarea ingresada no existe en la base de datos. Por favor, ingrese otra tarea." })
    return res.json(taskFound)
}

export const createTask = async (req, res) => {
    const { title, description, date } = req.body
    const newTask = new Task({ title, description, date, user: req.user.id })
    const savedTask = await newTask.save()
    return res.json(savedTask)
}

export const updateTask = async (req, res) => {
    const taskFound = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!taskFound) return res.staus(404).json({ message: "La tarea ingresada no existe en la base de datos. Por favor, ingrese otra tarea." })
    return res.json(taskFound)
}

export const deleteTask = async (req, res) => {
    const taskFound = await Task.findByIdAndDelete(req.params.id)
    if (!taskFound) return res.staus(404).json({ message: "La tarea ingresada no existe en la base de datos. Por favor, ingrese otra tarea." })
    return res.sendStatus(204)
}