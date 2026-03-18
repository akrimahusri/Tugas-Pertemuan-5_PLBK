// src/pages/Cart.jsx 
import { useCart } from '../context/CartContext'; 
 
export default function Cart() { 
  const { items, totalPrice, removeItem, clearCart } = useCart(); 
 
  if (items.length === 0) { 
    return ( 
      <div style={{ textAlign: 'center', padding: '3rem' }}> 
        <h2>Keranjang Kosong</h2> 
        <p>Belum ada produk di keranjang Anda.</p> 
      </div> 
    ); 
  } 
 
  return ( 
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}> 
      <h2>Keranjang Belanja</h2> 
      {items.map((item) => ( 
        <div key={item.id} style={{ 
          display: 'flex', alignItems: 'center', gap: '1rem', 
          padding: '1rem', borderBottom: '1px solid #eee', 
        }}> 
          <img src={item.image} alt={item.title} 
            style={{ width: '60px', height: '60px', objectFit: 'contain' }} /> 
          <div style={{ flex: 1 }}> 
            <h4 style={{ margin: '0 0 0.25rem' }}>{item.title}</h4> 
            <p style={{ margin: 0, color: '#666' }}> 
              ${item.price.toFixed(2)} x {item.quantity} 
            </p> 
          </div> 
          <p style={{ fontWeight: 'bold' }}> 
            ${(item.price * item.quantity).toFixed(2)} 
          </p> 
          <button onClick={() => removeItem(item.id)} 
            style={{ background: '#e74c3c', color: 'white', 
              border: 'none', padding: '0.5rem', borderRadius: '4px', 
              cursor: 'pointer' }}> 
            Hapus 
          </button> 
        </div> 
      ))} 
      <div style={{ marginTop: '1.5rem', textAlign: 'right' }}> 
        <h3>Total: ${totalPrice.toFixed(2)}</h3> 
        <button onClick={clearCart} style={{ 
          padding: '0.75rem 2rem', background: '#27AE60', 
          color: 'white', border: 'none', borderRadius: '4px', 
          fontSize: '1rem', cursor: 'pointer', 
        }}> 
          Checkout 
        </button> 
      </div> 
    </div> 
  ); 
} 