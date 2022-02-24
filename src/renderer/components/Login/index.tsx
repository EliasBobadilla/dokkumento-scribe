import React from 'react'
import { Button, TextInputField, toaster } from 'evergreen-ui'
import { useAppContext } from '../../context'
import { UserRequestDto } from '../../dtos/management'
import { getAuth, getRoles } from '../../helpers/db'
import { Container, LoginForm, LoginButton, LoginFooter } from './styles'

const Index = () => {
  const { language, setUserContext, setRoleContext } = useAppContext()
  const [user, setUser] = React.useState('')
  const [pwd, setPwd] = React.useState('')

  const submit = async () => {
    try {
      const request: UserRequestDto = { username: user, password: pwd }
      const currentUser = await getAuth(request)
      if (!currentUser) {
        toaster.danger(language.unauthorized)
        return
      }
      setUserContext(currentUser)

      const currentRoles = await getRoles()
      setRoleContext(currentRoles)
    } catch (error) {
      toaster.danger(language.loginProcessError)
    }
  }

  return (
    <Container>
      <LoginForm>
        <TextInputField
          label={language.loginUserLabel}
          required
          autoFocus
          value={user}
          onChange={(e: any) => setUser(e.target.value)}
          validationMessage={language.loginUserErrorMessage}
        />
        <TextInputField
          label={language.loginPwdLabel}
          required
          value={pwd}
          onChange={(e: any) => setPwd(e.target.value)}
          validationMessage={language.loginPwdErrorMessage}
        />
        <LoginButton>
          <Button onClick={submit} size='large'>
            {language.loginButtonLabel}
          </Button>
        </LoginButton>
        <LoginFooter>
          {language.PoweredBy}
          <strong>@NeoSaile</strong>
        </LoginFooter>
      </LoginForm>
    </Container>
  )
}

export default Index
