import Index from './components/Login'
import Principal from './components/Principal'
import { useAppContext } from './context'
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
  return <>{userContext.id === 0 ? <Index /> : <Principal />}</>
}

export default App
