import { createContext, useState, useContext } from "react";
import { registerRequest } from '../api/auth'
import Swal from 'sweetalert2';

const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("Para utilizar el contexto de usuario, el componente debe estar dentro de un proveedor correspondiente.")
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            await Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: res.data.message,
            })
            setUser(res.data.user)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signup
        }}>
            {children}
        </AuthContext.Provider>
    )
}