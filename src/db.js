import mongoose from 'mongoose'

export const connectDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost/metanet')
        console.log('Se ha conectado a la base de datos correctamente!')
    } catch(error) {
        console.log(error)
    }
}