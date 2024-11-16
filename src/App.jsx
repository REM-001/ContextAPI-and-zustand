import './App.css'
import Profil from './components/Profil'
import { UserContextProvider } from './contexts/context API/userContext'

function App() {

  return (
    <>
      <UserContextProvider>
        <Profil />
      </UserContextProvider>
    </>
  )
}

export default App
