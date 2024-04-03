import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputComponent from '../components/InputComponent'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function RegisterPage () {

    const { register, handleSubmit, formState:{ errors } } = useForm()

    const { signup, isAuthenticated } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSumbit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            <form onSubmit={ onSumbit } lang="es">

                <InputComponent type="text" name="username" action={register} placeholder="Nombre de usuario" /> 
                { errors.username && (<p className='text-red-500'>Por favor, ingrese un nombre de usuario.</p>) }

                <InputComponent type="email" name="email" action={register} placeholder="Dirección de correo electrónico" /> 
                { errors.email && (<p className='text-red-500'>Por favor, ingrese una dirección de correo electrónico.</p>) }
                <InputComponent type="password" name="password" action={register} placeholder="Contraseña"/> 
                { errors.password && (<p className='text-red-500'>Por favor, ingrese una contraseña.</p>) }

                <button type="submit">
                    Crear cuenta
                </button>
            </form>
        </div>
    )
}

export default RegisterPage