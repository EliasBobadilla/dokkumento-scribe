interface ManagementScreen {
  title: string
  alert: string
  placeholder1: string
  placeholder2?: string
  code: string
  name: string
  save: string
  edit: string
  cancel: string
  saveError: string
  okText: string
  cancelText: string
  deleteMessage: string
}

interface FieldManagementScreen {
  title: string
  alert: string
  placeholder1: string
  placeholder2: string
  code: string
  name: string
  minLen: string
  maxLen: string
  required: string
  uppercase: string
  save: string
  cancel: string
  saveError: string
}

interface HeaderScreen {
  projectPlaceholder: string
  formPlaceholder: string
  batchPlaceholder: string
}

interface TypistScreen {
  save: string
  forcedSave: string
  emptyTagMessage: string
  invalidFormMessage: string
  emptyFormMessage: string
  maxLenError: string
  minLenError: string
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
  projectCreator: ManagementScreen // todo: rename
  formCreator: ManagementScreen // todo: rename
  fieldCreator: FieldManagementScreen // todo: rename
  header: HeaderScreen
  typist: TypistScreen
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
    projectCreator: {
      title: 'string',
      alert: 'string',
      placeholder1: 'string',
      code: 'string',
      name: 'string',
      save: 'string',
      edit: 'string',
      cancel: 'string',
      saveError: 'string',
      okText: 'string',
      cancelText: 'string',
      deleteMessage: 'string',
    },
    formCreator: {
      title: 'string',
      alert: 'string',
      placeholder1: 'string',
      placeholder2: 'string',
      code: 'string',
      name: 'string',
      save: 'string',
      edit: 'string',
      cancel: 'string',
      saveError: 'string',
      okText: 'string',
      cancelText: 'string',
      deleteMessage: 'string',
    },
    fieldCreator: {
      title: 'string',
      alert: 'string',
      placeholder1: 'string',
      placeholder2: 'string',
      code: 'string',
      name: 'string',
      minLen: 'string',
      maxLen: 'string',
      required: 'string',
      uppercase: 'string',
      save: 'string',
      cancel: 'string',
      saveError: 'string',
    },
    header: {
      projectPlaceholder: 'string',
      formPlaceholder: 'string',
      batchPlaceholder: 'string',
    },
    typist: {
      save: 'string',
      forcedSave: 'string',
      emptyTagMessage: 'string',
      invalidFormMessage: 'string',
      emptyFormMessage: 'string',
      maxLenError: 'string',
      minLenError: 'string',
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
    batchLabelPlaceHolder: 'Lote / Caja',
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
    projectCreator: {
      title: 'Administración de Proyectos',
      alert:
        'Para crear un nuevo proyecto elija "Nuevo proyecto" y llene los demás datos. El código de proyecto debe ser único. Si elimina un proyecto, los datos guardados no podrán ser recuperados.',
      placeholder1: 'Nuevo proyecto',
      code: 'Codigo del proyecto',
      name: 'Nombre del proyecto',
      save: 'Guardar',
      edit: 'Editar',
      cancel: 'Cancelar',
      saveError: 'Error al guardar el proyecto, intente nuevamente',
      okText: 'Si',
      cancelText: 'No',
      deleteMessage: 'Seguro de eliminar el proyecto?',
    },
    formCreator: {
      title: 'Administración de Formularios',
      alert:
        'Para crear un nuevo formulario escoja "Nuevo formulario" y llene los demás datos. El código de formulario debe ser único. Si elimina un formulario, los datos guardados no podrán ser recuperados.',
      placeholder1: 'Selecciona un proyecto',
      placeholder2: 'Nuevo formulario',
      code: 'Codigo del formulario',
      name: 'Nombre del formulario',
      save: 'Guardar',
      edit: 'Editar',
      cancel: 'Cancelar',
      saveError: 'Error al guardar el formulario, intente nuevamente',
      okText: 'Si',
      cancelText: 'No',
      deleteMessage: 'Seguro de eliminar el formulario?',
    },
    fieldCreator: {
      title: 'Administración de campos',
      alert:
        'Para crear o modificar campos de un formulario escoja un formulario y llene los demás datos. El código del campo debe ser único. Si elimina un campo, los datos del campo no podrán ser recuperados.',
      placeholder1: 'Selecciona un formulario',
      placeholder2: 'Selecciona un tipo',
      code: 'Código',
      name: 'Nombre',
      minLen: 'Min',
      maxLen: 'Max',
      required: 'Requerido',
      uppercase: 'Mayúsculas',
      save: 'Guardar',
      cancel: 'Cancelar',
      saveError: 'Error al guardar los campos, intente nuevamente',
    },
    header: {
      projectPlaceholder: 'Proyectos',
      formPlaceholder: 'Formularios',
      batchPlaceholder: 'Lote / Caja',
    },
    typist: {
      save: 'Guardar datos correctos',
      forcedSave: 'Guardar datos con errores',
      emptyTagMessage: 'Se necesita un lote / caja para guardar el formulario',
      invalidFormMessage: 'El formulario contiene campos invalidos',
      emptyFormMessage: 'No se puede guardar un formulariom vacio',
      maxLenError: 'La longitud maxima permita es ',
      minLenError: 'La longitud minima requerida es ',
    },
  },
}
