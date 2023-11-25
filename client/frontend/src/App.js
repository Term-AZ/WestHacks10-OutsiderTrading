import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './reusables/Header/Header';
import Footer from './reusables/Footer/Footer';
import Landing from './pages/landing/Landing';
import Mainpage from './pages/main/Mainpage';
import Senatorpage from './pages/senatorpage/Senatorpage';
import Userpage from './pages/userpage/Userpage';
import Login from './pages/authorization/login/Login';
import Register from './pages/authorization/register/Register';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route  path="/" element={<Dashboard/>}>
          <Route name="default" path="/landing" element={<Landing/>}/>
          <Route path='/main' element={<Mainpage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/userpage/:username' element={<Userpage/>}/>
          <Route path='/senators/:id/:name' element={<Senatorpage/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}


function Dashboard(){
  return(
    <div>
      <Outlet/>
    </div>
  )
}
export default App;
