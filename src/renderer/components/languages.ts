interface ManagementScreen {
  title: string
  alert: string
  placeholder: string
  code: string
  name: string
  save: string
  cancel: string
  saveError: string
}

interface FormCreator {
  fieldType: string
  code: string
  name: string
  description: string
  minLen: string
  maxLen: string
  required: string
  uppercase: string
}

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
  formMainTitle: string
  formTitle: string
  formCreator: FormCreator
  projectManager: ManagementScreen
  formManager: ManagementScreen
}

type AvailableLanguages = {
  [key: string]: Language
}

export const languages: AvailableLanguages = {
  english: {
    unauthorized: 'string',
    loginProcessError: 'string',
    loginUserLabel: 'string',
    loginPwdLabel: 'string',
    loginUserErrorMessage: 'string',
    loginPwdErrorMessage: 'string',
    loginButtonLabel: 'string',
    PoweredBy: 'string',
    invalidFormMessage: 'string',
    emptyFormMessage: 'string',
    saveFormErrorMessage: 'string',
    projectButtonPlaceholder: 'string',
    formButtonPlaceholder: 'string',
    batchLabelPlaceHolder: 'string',
    emptyTagsMessage: 'string',
    nameIsRequired: 'string',
    codeIsRequired: 'string',
    projectNameLabel: 'string',
    projectCodeLabel: 'string',
    projectAlert: 'string',
    projectTitle: 'string',
    projectMainTitle: 'string',
    projectOnSaveError: 'string',
    save: 'save',
    formMainTitle: 'string',
    formTitle: 'string',
    formCreator: {
      fieldType: 'string',
      code: 'string',
      name: 'string',
      description: 'string',
      minLen: 'string',
      maxLen: 'string',
      required: 'string',
      uppercase: 'string',
    },
    projectManager: {
      title: 'string',
      alert: 'string',
      placeholder: 'string',
      code: 'string',
      name: 'string',
      save: 'string',
      cancel: 'string',
      saveError: 'string',
    },
    formManager: {
      title: 'string',
      alert: 'string',
      placeholder: 'string',
      code: 'string',
      name: 'string',
      save: 'string',
      cancel: 'string',
      saveError: 'string',
    },
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
    formTitle: 'Administrador de Formularios',
    formMainTitle: 'Administrador de Formuarios',
    save: 'Guardar',
    projectOnSaveError: 'Error al guardar el proyecto',
    formCreator: {
      fieldType: 'Tipo',
      code: 'Codigo',
      name: 'Nombre',
      description: 'Descripcion',
      minLen: 'Min.',
      maxLen: 'Max.',
      required: 'Requerido?',
      uppercase: 'Mayusculas?',
    },
    projectManager: {
      title: 'Administracion de Proyectos',
      alert:
        'El codigo de proyecto debe ser unico. Para crear un nuevo proyecto escoga "Nuevo proyecto" y llene los demas datos. Si elimina un proyecto, los datos no pueden ser recuperados',
      placeholder: 'Nuevo proyecto',
      code: 'Codigo del proyecto',
      name: 'Nombre del proyecto',
      save: 'Guardar',
      cancel: 'Cancelar',
      saveError: 'Error al guardar el proyecto, intente nuevamente',
    },
    formManager: {
      title: 'Administracion de Formularios',
      alert:
        'El codigo de formulario debe ser unico. Para crear un nuevo formulario escoga "Nuevo formulario" y llene los demas datos. Si elimina un formulario, los datos no pueden ser recuperados',
      placeholder: 'Nuevo formulario',
      code: 'Codigo del formulario',
      name: 'Nombre del formulario',
      save: 'Guardar',
      cancel: 'Cancelar',
      saveError: 'Error al guardar el formulario, intente nuevamente',
    },
  },
}
