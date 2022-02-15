import { Roles } from '../models/auth'
import Typist from './Typist'
import Admin from './Admin'
import SysAdmin from './SysAdmin'
import Header from './Header'
import { useAppContext } from '../context'

const Main = () => {
  const { roleContext } = useAppContext()
  return (
    <>
      <Header />
      {roleContext.Name === Roles.TYPIST && <Typist />}
      {roleContext.Name === Roles.ADMIN && <Admin />}
      {roleContext.Name === Roles.SYS_ADMIN && <SysAdmin />}
    </>
  )
}

export default Main
