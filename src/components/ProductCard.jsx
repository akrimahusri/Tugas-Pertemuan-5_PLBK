// src/components/ProductCard.jsx 
// Komponen reusable untuk menampilkan produk 
import { Link } from 'react-router-dom'; 
import { useCart } from '../context/CartContext'; 
 
export default function ProductCard({ product }) { 
  const { addItem } = useCart(); 
 
  return ( 
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '1rem', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
    }}> 
      <img 
        src={product.image} 
        alt={product.title} 
        style={{ width: '100%', height: '200px', objectFit: 'contain' }} 
      /> 
      <h3 style={{ fontSize: '0.9rem', margin: '0.5rem 0', flex: 1 }}> 
        {product.title.substring(0, 50)}... 
      </h3> 
      <p style={{ fontWeight: 'bold', color: '#E67E22', fontSize: '1.1rem' }}> 
        ${product.price.toFixed(2)} 
      </p> 
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}> 
        <Link 
          to={`/product/${product.id}`} 
          style={{ 
            flex: 1, padding: '0.5rem', textAlign: 'center', 
            background: '#EBF5FB', color: '#1B4F72', 
            borderRadius: '4px', textDecoration: 'none', 
          }} 
        > 
          Detail  
        </Link> 
        <button 
          onClick={() => addItem(product)} 
          style={{ 
            flex: 1, padding: '0.5rem', background: '#27AE60', 
            color: 'white', border: 'none', borderRadius: '4px', 
            cursor: 'pointer', 
          }} 
        > 
          + Keranjang 
        </button> 
      </div> 
    </div> 
  ); 
} 