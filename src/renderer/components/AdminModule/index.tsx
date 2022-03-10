import { Container } from './styles'
import ProjectModule from './projects'
import FormModule from './forms'
import FieldModule from './fields'

export default () => {
  return (
    <Container>
      <ProjectModule />
      <FormModule />
      <FieldModule />
      {/*      
      <UserModule />
      <StatisticsModule />
      <DataModule /> */}
    </Container>
  )
}
