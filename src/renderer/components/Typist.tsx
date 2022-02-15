import { Button } from 'evergreen-ui'
import { useAppContext } from '../context'

const Typist = () => {
  const { formContext, fieldTypeContext, projectContext } = useAppContext()

  const demo = () => {
    console.log('formContext =>', formContext)
    console.log('fieldTypeContext =>', fieldTypeContext)
    console.log('projectContext =>', projectContext)
  }
  return (
    <>
      <h1>SOY DIGITADOR</h1>
      <Button onClick={demo} marginRight={16}>
        cambiar proyecto
      </Button>
    </>
  )
}

export default Typist
