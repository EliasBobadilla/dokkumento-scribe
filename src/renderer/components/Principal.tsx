import { useState } from 'react'
import { Roles } from '../dtos/management'
import TypistModule from './TypistModule'
import Admin from './Admin'
import SysAdmin from './SysAdmin'
import { useAppContext } from '../context'
import Header from './Header'

const Main = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(0)
  const [selectedFormId, setSelectedFormId] = useState(0)
  const { userContext, roleContext } = useAppContext()
  const role = roleContext.find((r) => r.id === userContext.id)
  const [tags, setTags] = useState<string[]>([])

  return (
    <>
      <Header
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
        selectedFormId={selectedFormId}
        setSelectedFormId={setSelectedFormId}
        currentRole={role}
        tags={tags}
        setTags={setTags}
      />
      {role?.code === Roles.TYPIST &&
        selectedProjectId > 0 &&
        selectedFormId > 0 && (
          <TypistModule projectId={selectedProjectId} formId={selectedFormId} tags={tags} />
        )}
      {role?.code === Roles.ADMIN && <Admin />}
      {role?.code === Roles.SYS_ADMIN && <SysAdmin />}
    </>
  )
}

export default Main
