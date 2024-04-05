
import './App.css';
import Products from './components/Products';

import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import SingleProduct from './components/SingleProduct';

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      
      <Route exact path='/product' element={<Products/>} />
      <Route exact path='/product/:id' element={<SingleProduct />}/>
   

      
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
