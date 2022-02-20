import React from 'react'
import { Button, TextInputField, toaster } from 'evergreen-ui'
import styled from '@emotion/styled'
import { useAppContext } from '../context'
import { AuthModel } from '../models/auth'
import { background } from '../helpers/imageHandler'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${background}) no-repeat fixed center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginForm = styled.div`
  width: 25%;
  height: 400px;
  background-color: rgba(250, 250, 250, 0.8);
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.5);
  border-radius: 10px;
  padding: 80px 50px;
  position: relative;
`

const LoginButton = styled.div`
  margin-top: 30px;
  position: absolute;
  right: 50px;
`

const LoginFooter = styled.div`
  height: 20px;
  width: calc(100% - 100px);
  font-size: 0.9em;
  color: #757575;
  position: absolute;
  bottom: 10px;
  text-align: center;
`

const Login = () => {
  const { setUserContext, setRoleContext } = useAppContext()
  const [user, setUser] = React.useState('')
  const [pwd, setPwd] = React.useState('')

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
    <Container>
      <LoginForm>
        <TextInputField
          label='Usuario'
          required
          value={user}
          onChange={(e: any) => setUser(e.target.value)}
          validationMessage='El nombre de usuario requerido'
        />
        <TextInputField
          label='Contraseña'
          required
          value={pwd}
          onChange={(e: any) => setPwd(e.target.value)}
          validationMessage='La contraseña es requerida'
        />
        <LoginButton>
          <Button onClick={getAuth} size='large'>
            INGRESAR
          </Button>
        </LoginButton>
        <LoginFooter>
          Powered by <strong>@NeoSaile</strong>
        </LoginFooter>
      </LoginForm>
    </Container>
  )
}

export default Login
