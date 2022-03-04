import Index from './components/Login'
import Main from './containers/main'
import { useAppContext } from './context'

import 'antd/dist/antd.css'
import './App.css'

declare global {
  interface Window {
    electron: {
      ipc: {
        invoke: <T>(channel: string, arg: any) => Promise<T>
      }
    }
  }
}

const App = () => {
  const { userContext } = useAppContext()
  return <>{userContext.id === 0 ? <Index /> : <Main />}</>
}

export default App
