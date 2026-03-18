// src/App.jsx 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { CartProvider } from './context/CartContext'; 
import Header from './components/Header'; 
import Home from './pages/Home'; 
import Cart from './pages/Cart'; 
import ProductDetail from './pages/ProductDetail'; 
 
function App() { 
  return ( 
    <CartProvider> 
      <BrowserRouter> 
        <Header /> 
        <Routes> 
          <Route path='/' element={<Home />} /> 
          <Route path='/cart' element={<Cart />} /> 
          <Route path='/product/:id' element={<ProductDetail />} /> 
        </Routes> 
      </BrowserRouter> 
    </CartProvider> 
  ); 
} 
 
export default App; 