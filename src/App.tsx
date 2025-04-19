import { Provider } from 'react-redux'
import EstiloGlobal, { Container } from './styles'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <EstiloGlobal />
      <Container>
        <div>Test</div>
      </Container>
    </Provider>
  )
}

export default App
