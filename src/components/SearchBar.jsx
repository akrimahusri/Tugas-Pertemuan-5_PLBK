export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari produk berdasarkan nama..."
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "0.75rem 1rem",
          borderRadius: "8px",
          border: "1px solid #cfd8dc",
          outline: "none",
          fontSize: "1rem",
        }}
      />
    </div>
  );
}
