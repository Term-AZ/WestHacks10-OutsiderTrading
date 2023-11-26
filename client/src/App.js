import logo from './logo.svg';
import './App.css';


import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SenatorCard from './components/senatorCard/SenatorCard';
import LandingPage from './pages/landingPage/LandingPage';
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
        <Route path='/senators' element={<SenatorPage/>}/>
        <Route path='/senator/:id' element={<Senatordatapage/>}/>
        <Route path='/portfolio' element={<PortfolioPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
