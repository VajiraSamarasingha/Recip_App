import './App.css'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Create_Recipt from './pages/Create_Recipt/Create_Recipt'
import Saved_Recipt from './pages/Saved_Recipt/Saved_Recipt'
import Auths from './pages/Auths/Auths'

function App() {

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/create-recipy' element={<Create_Recipt/>}/>
            <Route path='/saved-recipy' element={<Saved_Recipt/>}/>
            <Route path='/auth' element={<Auths/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
