import React from 'react'

function InputComponent({ type, name, action, placeholder }){
    return (
        <input type={ type } { ... action(name, { required: true })} placeholder={ placeholder } 
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
    )
}

export default InputComponent
