import { Form, Input, Button, message } from 'antd'
import { useAppContext } from '../../context'
import { UserRequestDto } from '../../../dtos/general'
import { getAuth, getRoles } from '../../helpers/db'
import { Container, LoginFooter, LoginForm } from './styles'

export default () => {
  const { language, setUserContext, setRoleContext } = useAppContext()

  const onSubmit = async (values: UserRequestDto) => {
    try {
      const currentUser = await getAuth(values)
      if (!currentUser) {
        message.error(language.login.unauthorized)
        return
      }
      setUserContext(currentUser)

      const currentRoles = await getRoles()
      setRoleContext(currentRoles)
    } catch (error) {
      message.error(language.login.processError)
    }
  }

  const onFinishFailed = () => {
    message.error(language.login.unauthorized)
  }

  return (
    <Container>
      <LoginForm>
        <Form
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          name='loginForm'
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item
            label={language.login.userLabel}
            name='username'
            rules={[
              { required: true, message: language.login.userErrorMessage },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={language.login.pwdLabel}
            name='password'
            rules={[
              { required: true, message: language.login.pwdErrorMessage },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block size='large'>
              {language.login.buttonLabel}
            </Button>
          </Form.Item>
        </Form>
      </LoginForm>
      <LoginFooter>
        {language.login.poweredBy}
        <strong>@NeoSaile</strong>
      </LoginFooter>
    </Container>
  )
}
