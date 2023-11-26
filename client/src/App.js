import logo from './logo.svg';
import './App.css';


import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SenatorCard from './components/senatorCard/SenatorCard';
import LandingPage from './pages/landingPage/LandingPage';
import LoginPage from './pages/loginPage/LoginPage';
import RegisterPage from './pages/registerPage/RegisterPage';
import SenatorPage from './pages/senatorPage/SenatorPage';
import PortfolioPage from './pages/portfolioPage/PortfolioPage';
import Senatordatapage from './pages/senatordatapage/Senatordatapage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/user/login' element={<LoginPage/>}/>
        <Route path='/user/register' element={<RegisterPage/>}/>
        <Route path='/senators' element={<SenatorPage/>}/>
        <Route path = '/sentator/:id' element={<Senatordatapage/>}/>
        <Route path='/portfolio' element={<PortfolioPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
