import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Create_recipt from './pages/Create_recipt';
import Saved_recipy from './pages/Saved_recipy';
import Auths from './pages/Auths';
import Home from './pages/Home';


function App() {
  

  return (
    <>
    <div className='App'>
      <BrowserRouter>
        
       <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-recipy' element={<Create_recipt/>}/>
          <Route path='/saved-recipy' element={<Saved_recipy/>}/>
          <Route path='/auth' element={<Auths/>}/>
        </Routes>
      </BrowserRouter>
    </div>  
    </>
    
  )
}

export default App
