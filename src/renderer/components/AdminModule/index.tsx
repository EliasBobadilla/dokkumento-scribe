import { Container } from './styles'
import ProjectModule from './projects'
import FormModule from './forms'
import FieldModule from './fields'
import UserModule from './users'
import StatisticsModule from './statistics'
import DataModule from './data'

const AdminModule = () => {
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

export default AdminModule
