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
  emptyTagsMessage: string
  nameIsRequired: string
  codeIsRequired: string
  projectNameLabel: string
  projectCodeLabel: string
  projectAlert: string
  projectTitle: string
  projectMainTitle: string
  save: string
  projectOnSaveError: string
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
    emptyTagsMessage: 'Batch can not be empty',
    nameIsRequired: 'The name is required',
    codeIsRequired: 'The name is required',
    projectNameLabel: 'string',
    projectCodeLabel: 'string',
    projectAlert: 'string',
    projectTitle: 'Administrar Proyectos',
    projectMainTitle: 'string',
    projectOnSaveError: 'string',
    save: 'save',
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
    emptyTagsMessage: 'Debe ingresar un lote como minimo',
    nameIsRequired: 'El nombre es obligatorio',
    codeIsRequired: 'El codigo es obligatorio',
    projectNameLabel: 'Nombre del proyecto',
    projectCodeLabel: 'Codigo del proyecto',
    projectAlert:
      'El codigo del formulario debe ser unico xq sera utilizado en el nombre de la tabla en la base de datos',
    projectTitle: 'Administrar Proyectos',
    projectMainTitle: 'Administrador de proyectos',
    save: 'Guardar',
    projectOnSaveError: 'Error al guardar el proyecto',
  },
}
