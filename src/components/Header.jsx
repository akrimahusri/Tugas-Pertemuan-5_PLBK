// src/components/Header.jsx 
import { Link } from 'react-router-dom'; 
import { useCart } from '../context/CartContext'; 
 
export default function Header() { 
  const { totalItems } = useCart(); 
 
  return ( 
    <header style={{ 
      background: '#1B4F72', 
      color: 'white', 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
    }}> 
      <Link to='/' style={{ color: 'white', textDecoration: 'none' }}> 
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>CBSE Store</h1> 
      </Link> 
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}> 
        <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Home</Link> 
        <Link to='/cart' style={{ color: 'white', textDecoration: 'none' }}> 
          Cart ({totalItems}) 
        </Link> 
      </nav> 
    </header> 
  ); 
}