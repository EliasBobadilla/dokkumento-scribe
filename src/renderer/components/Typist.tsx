import { Button, TextInputField } from 'evergreen-ui'
import { useAppContext } from '../context'
import { FormFieldModel } from '../models/form'

const Typist: React.FC = () => {
  const { formContext, fieldTypeContext, projectContext } = useAppContext()

  const demo = () => {
    console.log('formContext =>', formContext)
    console.log('fieldTypeContext =>', fieldTypeContext)
    console.log('projectContext =>', projectContext)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const formData = new FormData(event.currentTarget)
    event.preventDefault()

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }
  }

  return (
    <>
      <Button onClick={demo} marginRight={16}>
        Leer datos de los formularios
      </Button>

      <form onSubmit={handleSubmit}>
        <Button>Guardar</Button>
        {formContext.FormFields.map((field: FormFieldModel) => {
          const fieldType = fieldTypeContext.find(
            (t) => t.Id === field.FieldTypeId,
          )
          return (
            <TextInputField
              key={field.Name}
              name={field.Name}
              label={field.Label}
              required={field.Required}
              description={field.Description}
              validationMessage={fieldType?.ValidationMessage}
            />
          )
        })}
      </form>
    </>
  )
}

export default Typist
