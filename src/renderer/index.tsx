import { render } from 'react-dom'
import { AppContextProvider } from './context'
import App from './App'

render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById('root'),
)
