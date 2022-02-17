import { useState } from 'react'
import { Roles } from '../models/auth'
import Typist from './Typist'
import Admin from './Admin'
import SysAdmin from './SysAdmin'
import Header from './Header'
import { useAppContext } from '../context'

const Main = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(0)
  const [selectedFormId, setSelectedFormId] = useState(0)
  const { roleContext } = useAppContext()
  return (
    <>
      <Header
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
        selectedFormId={selectedFormId}
        setSelectedFormId={setSelectedFormId}
      />
      {roleContext.Code === Roles.TYPIST && (
        <Typist projectId={selectedProjectId} formId={selectedFormId} />
      )}
      {roleContext.Code === Roles.ADMIN && <Admin />}
      {roleContext.Code === Roles.SYS_ADMIN && <SysAdmin />}
    </>
  )
}

export default Main
