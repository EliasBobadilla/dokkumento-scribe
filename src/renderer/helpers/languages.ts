interface LoginScreen {
  unauthorized: string
  processError: string
  userLabel: string
  pwdLabel: string
  userErrorMessage: string
  pwdErrorMessage: string
  buttonLabel: string
  poweredBy: string
}

interface HeaderScreen {
  projectPlaceholder: string
  formPlaceholder: string
  batchPlaceholder: string
}

interface ManagementScreen {
  title?: string
  alert?: string
  placeholder1?: string
  placeholder2?: string
  placeholder3?: string
  order?: string
  fieldType?: string
  code?: string
  name?: string
  minLen?: string
  maxLen?: string
  required?: string
  uppercase?: string
  datasource?: string
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

interface Commons {
  tag: string
  save: string
  edit: string
  cancel: string
  saveError: string
  okText: string
  cancelText: string
  deleteMessage: string
  requiredFieldErrorMessage: string
  codeFieldErrorMessage: string
  addField: string
}

export interface Language {
  login: LoginScreen
  header: HeaderScreen
  project: ManagementScreen
  form: ManagementScreen
  field: ManagementScreen
  typist: TypistScreen
  commons: Commons
}

type AvailableLanguages = {
  [key: string]: Language
}

export const languages: AvailableLanguages = {
  spanish: {
    login: {
      unauthorized: 'Ingresa un usuario y contraseña correctos',
      processError: 'Error durante el inicio de sesión, intente nuevamente',
      userLabel: 'Usuario',
      pwdLabel: 'Contraseña',
      userErrorMessage: 'El nombre de usuario requerido',
      pwdErrorMessage: 'La contraseña es requerida',
      buttonLabel: 'INGRESAR',
      poweredBy: 'Desarrollado por ',
    },
    project: {
      title: 'Administración de Proyectos',
      alert:
        'Para crear un nuevo proyecto elija "Nuevo proyecto" y llene los demás datos. El código de proyecto debe ser único. Si elimina un proyecto, los datos guardados no podrán ser recuperados.',
      placeholder1: 'Nuevo proyecto',
      code: 'Codigo',
      name: 'Nombre',
    },
    form: {
      title: 'Administración de Formularios',
      alert:
        'Para crear un nuevo formulario escoja "Nuevo formulario" y llene los demás datos. El código de formulario debe ser único. Si elimina un formulario, los datos guardados no podrán ser recuperados.',
      placeholder1: 'Selecciona un proyecto',
      placeholder2: 'Nuevo formulario',
      code: 'Codigo',
      name: 'Nombre',
    },
    field: {
      title: 'Administración de campos',
      alert:
        'Para crear o modificar campos de un formulario escoja un formulario y llene los demás datos. El código del campo debe ser único. Si elimina un campo, los datos del campo no podrán ser recuperados.',
      placeholder1: 'Selecciona un formulario',
      placeholder2: 'Selecciona un tipo',
      placeholder3: 'Selecciona una tabla',
      order: 'Orden',
      fieldType: 'Tipo de campo',
      code: 'Código',
      name: 'Nombre',
      minLen: 'Min',
      maxLen: 'Max',
      required: 'Requerido',
      uppercase: 'Mayúsculas',
      datasource: 'Autocompletado',
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
      emptyFormMessage: 'No se puede guardar un formularios vacio',
      maxLenError: 'La longitud maxima permita es ',
      minLenError: 'La longitud minima requerida es ',
    },
    commons: {
      tag: 'Lote / Caja',
      save: 'GUARDAR',
      edit: 'EDITAR',
      cancel: 'CANCELAR',
      saveError: 'Error al guardar!',
      okText: 'Aceptar',
      cancelText: 'Cancelar',
      deleteMessage: 'Estas seguro de eliminar el registro?',
      requiredFieldErrorMessage: 'Este campo es requerido!',
      codeFieldErrorMessage: 'el codigo es requerido!',
      addField: 'Agregar campo',
    },
  },
}
