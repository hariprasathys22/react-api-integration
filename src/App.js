
import './App.css';
import Products from './components/Products';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SingleProduct from './components/SingleProduct';

function App() {
  const isRootPath = ()=>{
    return window.location.pathname === "/"
  }
  return (
    <BrowserRouter>
    
    <Routes>
      
      <Route exact path='/product' element={<Products/>} />
      <Route exact path='/product/:id' element={<SingleProduct />}/>
      <Route path="/" element={isRootPath()?<Navigate to="/product"/>:<Products />}/>

      
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
