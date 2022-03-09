import { useState } from 'react'
import { Container } from './styles'
import ProjectModule from './projects'
import FormModule from './forms'
import FieldModule from './fields'

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
