import { Container } from './styles'
import ProjectModule from './projects'
import FormModule from './forms'
import FieldModule from './fields'
import UserModule from './users'
import StatisticsModule from './statistics'
import DataModule from './data'
import { useState } from 'react'

const AdminModule = () => {
  const [projectIsVisible, setProjectIsVisible] = useState(false)

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
