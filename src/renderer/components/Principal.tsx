import { useAppContext } from '../context'

const Main = () => {
  const { userContext, roleContext } = useAppContext()

  return (
    <>
      {JSON.stringify(userContext)}
      {JSON.stringify(roleContext)}
    </>
  )
}

export default Main
