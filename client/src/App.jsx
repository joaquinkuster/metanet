import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <h1>Inicio</h1> }></Route>
        <Route path='/login' element={ <LoginPage /> }></Route>
        <Route path='/register' element={ <RegisterPage /> }></Route>
        <Route path='/tasks' element={ <h1>Tareas</h1> }></Route>
        <Route path='/tasks/:id' element={ <h1>Modificar Tarea</h1> }></Route>
        <Route path='/add-task' element={ <h1>Agregar Tarea</h1> }></Route>
        <Route path='/profile' element={ <h1>Perfil</h1> }></Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
