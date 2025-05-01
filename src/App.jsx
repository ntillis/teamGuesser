import Home from './pages/Home.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import './css/App.css'
import { GuessProvider } from './contexts/GuessContext.jsx'

function App() {
  return (
    <GuessProvider>
      <NavBar />
      <main className="main-content">
        <Home />
      </main>
      <Footer />
    </GuessProvider>
  )
}

export default App
