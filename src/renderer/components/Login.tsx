import React from 'react'
import { TextInputField, Button, toaster } from 'evergreen-ui'
import { useAppContext } from '../context'
import { AuthModel } from '../models/auth'

const Login = () => {
  const { userContext, roleContext, setUserContext, setRoleContext } =
    useAppContext()
  const [user, setUser] = React.useState('')
  const [pwd, setPwd] = React.useState('')

  const read = () => {
    console.log(userContext)
    console.log(roleContext)
  }

  const getAuth = async () => {
    try {
      if (!user || !pwd) {
        toaster.danger('Debe ingresar un usuario y contraseña validos!')
        return
      }
      const request = { user, pwd }
      const response = await window.electron.ipc.invoke<AuthModel>(
        'login',
        request,
      )
      const { User, Role } = response
      setUserContext(User)
      setRoleContext(Role)
    } catch (error) {
      toaster.danger('Error durante la autenticacion, acceso denegado')
    }
  }

  return (
    <>
      <TextInputField
        label='Usuario'
        required
        description='Escriba el nombre de usuario asignado por su administrador'
        value={user}
        onChange={(e: any) => setUser(e.target.value)}
        validationMessage='El usuario requerido'
      />
      <TextInputField
        label='Contraseña'
        required
        description='Escriba la contraseña asignada por su administrador'
        value={pwd}
        onChange={(e: any) => setPwd(e.target.value)}
        validationMessage='La contraseña es requerida'
      />
      <Button onClick={getAuth} marginRight={16}>
        INGRESAR
      </Button>
      <Button onClick={read} marginRight={16}>
        READ CONTEXT
      </Button>
    </>
  )
}

export default Login
