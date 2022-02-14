// import icon from '../../assets/icon.svg'
import Login from './components/Login'
import Principal from './components/Principal'
import { useAppContext } from './context'

import './App.css'

declare global {
  interface Window {
    electron: {
      ipc: {
        invoke: <T>(channel: string, arg: any) => T
      }
    }
  }
}

const App = () => {
  const { userContext } = useAppContext()
  return <>{userContext.Id === 0 ? <Login /> : <Principal />}</>
}

export default App

/*

const Hello = () => {
  const getStore = async () => {
    // console.log(window.electron.store.get('prueba'));
    const response = await window.electron.ipc.invoke('login', {
      user: 'saile',
      pwd: '42972966',
    })
    console.log('=>', response)
  }

  return (
    <div>
      <div className='Hello'>
        <img width='200px' alt='icon' src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className='Hello'>
        <button type='button' onClick={setStore}>
          PROBAR!
        </button>
        <button type='button' onClick={getStore}>
          PROBAR!
        </button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Hello />} />
      </Routes>
    </Router>
  )
}

*/
