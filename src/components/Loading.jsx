// src/components/Loading.jsx
export default function Loading() {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          margin: "0 auto",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #1B4F72",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p style={{ marginTop: "1rem", color: "#666" }}>Memuat data...</p>
    </div>
  );
}
