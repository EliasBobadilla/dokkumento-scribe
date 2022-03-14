import { Container } from './styles'
import ProjectModule from './projects'
import FormModule from './forms'
import FieldModule from './fields'
import DataModule from './data'

export default () => (
  <Container>
    <ProjectModule />
    <FormModule />
    <FieldModule />
    <DataModule />
    {/*      
    <UserModule />
    <StatisticsModule />
     */}
  </Container>
)
