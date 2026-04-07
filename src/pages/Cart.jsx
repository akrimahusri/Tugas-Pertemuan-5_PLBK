import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { z } from "zod";
import { useCart } from "../context/CartContext";

dayjs.locale("id");

const checkoutSchema = z.object({
  name: z.string().trim().min(3, "Nama minimal 3 karakter."),
  address: z.string().trim().min(10, "Alamat minimal 10 karakter."),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+62|62|0)[0-9]{8,13}$/, "Nomor telepon harus valid."),
});

const initialForm = {
  name: "",
  address: "",
  phone: "",
};

function Cart() {
  const { items, totalPrice, removeItem, clearCart, updateItemQuantity } =
    useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [orderSummary, setOrderSummary] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (items.length === 0) {
      setErrors({ form: "Keranjang masih kosong." });
      return;
    }

    const result = checkoutSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        address: fieldErrors.address?.[0],
        phone: fieldErrors.phone?.[0],
      });
      return;
    }

    const orderDate = dayjs().format("dddd, D MMMM YYYY HH:mm");
    const orderId = `ORD-${dayjs().format("YYYYMMDDHHmmss")}`;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    setOrderSummary({
      orderId,
      orderDate,
      customerName: result.data.name,
      totalItems,
      totalPrice,
    });
    setErrors({});
    setForm(initialForm);
    clearCart();
  };

  if (orderSummary) {
    return (
      <div style={{ padding: "2rem", maxWidth: "760px", margin: "0 auto" }}>
        <div
          style={{
            border: "1px solid #d5f5e3",
            background: "#f0fbf5",
            borderRadius: "16px",
            padding: "1.5rem",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Order berhasil dibuat</h2>
          <p style={{ marginBottom: "0.5rem" }}>
            Terima kasih, {orderSummary.customerName}. Pesanan Anda sudah
            dicatat.
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            ID Order: {orderSummary.orderId}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            Tanggal order: {orderSummary.orderDate}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            Total item: {orderSummary.totalItems}
          </p>
          <p style={{ marginBottom: "1.25rem" }}>
            Total pembayaran: ${orderSummary.totalPrice.toFixed(2)}
          </p>
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.25rem",
              background: "#1B4F72",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Lanjut belanja
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Keranjang Kosong</h2>
        <p>Belum ada produk di keranjang Anda.</p>
        <Link to="/" style={{ color: "#1B4F72", textDecoration: "none" }}>
          Kembali ke katalog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h2>Keranjang Belanja</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(320px, 0.8fr)",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >
        <section>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                borderBottom: "1px solid #eee",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "60px", height: "60px", objectFit: "contain" }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 0.25rem" }}>{item.title}</h4>
                <p style={{ margin: 0, color: "#666" }}>
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <button
                    onClick={() => updateItemQuantity(item.id, -1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateItemQuantity(item.id, 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <p style={{ fontWeight: "bold" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </div>
          ))}

          <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        </section>

        <aside
          style={{
            border: "1px solid #eee",
            borderRadius: "16px",
            padding: "1.25rem",
            background: "#fff",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Checkout</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "0.35rem" }}
              >
                Nama
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama lengkap"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  boxSizing: "border-box",
                }}
              />
              {errors.name ? (
                <p style={{ color: "#c0392b", margin: "0.35rem 0 0" }}>
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="address"
                style={{ display: "block", marginBottom: "0.35rem" }}
              >
                Alamat
              </label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Alamat pengiriman"
                rows="4"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  boxSizing: "border-box",
                  resize: "vertical",
                }}
              />
              {errors.address ? (
                <p style={{ color: "#c0392b", margin: "0.35rem 0 0" }}>
                  {errors.address}
                </p>
              ) : null}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="phone"
                style={{ display: "block", marginBottom: "0.35rem" }}
              >
                Nomor telepon
              </label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  boxSizing: "border-box",
                }}
              />
              {errors.phone ? (
                <p style={{ color: "#c0392b", margin: "0.35rem 0 0" }}>
                  {errors.phone}
                </p>
              ) : null}
            </div>

            {errors.form ? (
              <p style={{ color: "#c0392b" }}>{errors.form}</p>
            ) : null}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.9rem 1rem",
                background: "#27AE60",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Buat Order
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
