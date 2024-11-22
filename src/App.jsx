import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Manager from './components/manager'
import Footer from './components/footer'
function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <div className='bg-green-100 h-[100vh] relative'>
        <NavBar/>
        <Manager/>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
