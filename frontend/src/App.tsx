import React from 'react'
import Router from './routes'
import {Navbar, Footer} from './components'
import NavbarSpace from './components/NavbarSpace';
import { BrowserRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <NavbarSpace />
      <Router />
      <Footer />
    </BrowserRouter>
  )
}

export default App