export interface Language {
  unauthorized: string
  loginProcessError: string
  loginUserLabel: string
  loginPwdLabel: string
  loginUserErrorMessage: string
  loginPwdErrorMessage: string
  loginButtonLabel: string
  PoweredBy: string
  invalidFormMessage: string
  emptyFormMessage: string
  saveFormErrorMessage: string
  projectButtonPlaceholder: string
  formButtonPlaceholder: string
  batchLabelPlaceHolder: string
}

type AvailableLanguages = {
  [key: string]: Language
}

export const languages: AvailableLanguages = {
  english: {
    unauthorized: 'Please enter a correct username and password',
    loginProcessError: 'Error while login process, please try again',
    loginUserLabel: 'Username',
    loginPwdLabel: 'Password',
    loginUserErrorMessage: 'The username field is required',
    loginPwdErrorMessage: 'The password field is required',
    loginButtonLabel: 'LOGIN',
    PoweredBy: 'Powered by ',
    invalidFormMessage: 'The form has invalid inputs!',
    emptyFormMessage: 'You can not send a empty form',
    saveFormErrorMessage: 'Error on save form data, please try again',
    projectButtonPlaceholder: 'Choice a project',
    formButtonPlaceholder: 'Choice a form',
    batchLabelPlaceHolder: 'Batch',
  },
  spanish: {
    unauthorized: 'Por favor, ingresa un usuario y contraseña correctos',
    loginProcessError:
      'Error durante el proceso de inicio de sesión, intente nuevamente',
    loginUserLabel: 'Usuario',
    loginPwdLabel: 'Contraseña',
    loginUserErrorMessage: 'El nombre de usuario requerido',
    loginPwdErrorMessage: 'La contraseña es requerida',
    loginButtonLabel: 'INGRESAR',
    PoweredBy: 'Desarrollador por ',
    invalidFormMessage: 'El formulario contiene datos invalidos!',
    emptyFormMessage: 'No puede enviar un formulario vacio',
    saveFormErrorMessage: 'Error al guardar los datos, intente nuevamente',
    projectButtonPlaceholder: 'Selecciona un proyecto',
    formButtonPlaceholder: 'Selecciona un formulario',
    batchLabelPlaceHolder: 'Lote',
  },
}
