import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import Loading from "../components/Loading";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error)
    return <p style={{ color: "red", padding: "2rem" }}>Error: {error}</p>;
  if (!product)
    return <p style={{ padding: "2rem" }}>Produk tidak ditemukan.</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#1B4F72" }}>
        {"< Kembali ke Home"}
      </Link>

      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "1.5rem",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", maxHeight: "420px", objectFit: "contain" }}
          />
        </div>

        <div>
          <p
            style={{
              textTransform: "capitalize",
              color: "#5d6d7e",
              marginBottom: "0.5rem",
            }}
          >
            {product.category}
          </p>
          <h2 style={{ marginTop: 0 }}>{product.title}</h2>
          <p
            style={{
              fontSize: "1.75rem",
              color: "#E67E22",
              fontWeight: "bold",
              margin: "1rem 0",
            }}
          >
            ${product.price.toFixed(2)}
          </p>
          <p style={{ lineHeight: 1.6, color: "#2c3e50" }}>
            {product.description}
          </p>

          {product.rating ? (
            <p style={{ marginTop: "1rem", color: "#34495e" }}>
              Rating: {product.rating.rate} / 5 ({product.rating.count} ulasan)
            </p>
          ) : null}

          <button
            onClick={() => addItem(product)}
            style={{
              marginTop: "1.25rem",
              padding: "0.8rem 1.5rem",
              background: "#27AE60",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            + Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
