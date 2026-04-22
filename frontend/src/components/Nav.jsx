export function Nav({ navigate, current, onSignIn, onJoin, user, onLogout }) {
  const pages = [
    { key: "home",      label: "HOME" },
    { key: "library",   label: "LIBRARY" },
    { key: "community", label: "COMMUNITY" },
    { key: "quill",     label: "QUILL" },
  ];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => navigate("home")}>
          <div className="nav-logo-ring">✦</div>
          <div className="nav-logo-txt">
            <span className="nav-logo-name">LUMINARY</span>
            <span className="nav-logo-sub">The Archive</span>
          </div>
        </div>
        <ul className="nav-links">
          {pages.map(p => (
            <li key={p.key}><a className={current === p.key ? "active" : ""} onClick={() => navigate(p.key)}>{p.label}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <div className="nav-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input placeholder="Search the stacks…" onChange={(e) => onSearch(e.target.value)} />
          </div>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {user.role === 'ADMIN' && (
                <button className="btn-text" onClick={() => navigate("admin")} style={{ fontSize: '11px', letterSpacing: '0.1em' }}>ADMIN DASHBOARD</button>
              )}
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#fff', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>{user.username.toUpperCase()}</div>
                <div style={{ color: 'var(--gold)', fontSize: '9px', cursor: 'pointer' }} onClick={onLogout}>LOGOUT</div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontSize: '14px' }}>
                {user.username[0].toUpperCase()}
              </div>
            </div>
          ) : (
            <>
              <button className="btn-text" onClick={onSignIn} style={{ fontSize: '11px', letterSpacing: '0.1em' }}>SIGN IN</button>
              <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '11px' }} onClick={onJoin}>SIGN UP</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
