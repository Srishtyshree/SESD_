export function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {i > 0 && <span style={{ opacity: 0.5 }}>›</span>}
          {item.action
            ? <a onClick={item.action} style={{ cursor: 'pointer', color: 'var(--gold)' }}>{item.label}</a>
            : <span className="current" style={{ opacity: 0.8 }}>{item.label}</span>}
        </span>
      ))}
    </div>
  );
}
