// src/pages/Home.jsx 
import { useState, useEffect } from 'react'; 
import { getProducts, getCategories } from '../services/api'; 
import ProductCard from '../components/ProductCard'; 
import Loading from '../components/Loading'; 
 
export default function Home() { 
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
 
  useEffect(() => { 
    async function fetchData() { 
      try { 
        setLoading(true); 
        const [productsData, categoriesData] = await Promise.all([ 
          getProducts(), 
          getCategories(), 
        ]); 
        setProducts(productsData); 
        setCategories(categoriesData); 
      } catch (err) { 
        setError(err.message); 
      } finally { 
        setLoading(false); 
      } 
    } 
    fetchData(); 
  }, []); 
 
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter((p) => p.category === selectedCategory); 
 
  if (loading) return <Loading />; 
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>; 
 
  return ( 
    <div style={{ padding: '2rem' }}> 
      <h2>Katalog Produk</h2> 
 
      {/* Filter Kategori */} 
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' 
}}> 
        <button 
          onClick={() => setSelectedCategory('all')} 
          style={{ 
            padding: '0.5rem 1rem', 
            background: selectedCategory === 'all' ? '#1B4F72' : '#EBF5FB', 
            color: selectedCategory === 'all' ? 'white' : '#1B4F72', 
            border: 'none', borderRadius: '20px', cursor: 'pointer', 
          }} 
        > 
          Semua 
        </button> 
        {categories.map((cat) => ( 
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)} 
            style={{ 
              padding: '0.5rem 1rem', 
              background: selectedCategory === cat ? '#1B4F72' : '#EBF5FB', 
              color: selectedCategory === cat ? 'white' : '#1B4F72', 
              border: 'none', borderRadius: '20px', cursor: 'pointer', 
              textTransform: 'capitalize', 
            }} 
          > 
            {cat} 
          </button> 
        ))} 
      </div> 
 
      {/* Grid Produk */} 
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '1.5rem', 
      }}> 
        {filteredProducts.map((product) => ( 
          <ProductCard key={product.id} product={product} /> 
        ))} 
      </div> 
    </div> 
  ); 
} 