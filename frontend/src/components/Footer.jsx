import {CORRIDORS_DATA} from "../data/archiveData";

export function Footer({navigate}) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="nav-logo" style={{cursor: "pointer"}} onClick={() => navigate("home")}>
            <div className="nav-logo-ring">✦</div>
            <div className="nav-logo-txt">
              <span className="nav-logo-name">LUMINARY</span>
              <span className="nav-logo-sub">The Archive</span>
            </div>
          </div>
          <p className="footer-desc">A candlelit reading room for wanderers, dreamers, and those who still believe words are sacred.</p>
        </div>
        {[
          {title: "CORRIDORS", links: CORRIDORS_DATA.map(c => ({label: c.label, action: () => navigate("corridor", {id: c.id})}))},
          {title: "ARCHIVE", links: [{label: "The Library", action: () => navigate("library")}, {label: "New Arrivals", action: () => { }}, {label: "Rare Volumes", action: () => { }}, {label: "This Season", action: () => { }}]},
          {title: "QUILL", links: [{label: "Write", action: () => navigate("quill")}, {label: "Community", action: () => navigate("community")}, {label: "Fellowships", action: () => { }}, {label: "About", action: () => { }}]},
        ].map(col => (
          <div key={col.title}>
            <div className="footer-col-title">{col.title}</div>
            <ul className="footer-links">
              {col.links.map(l => <li key={l.label}><a onClick={l.action}>{l.label}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bot">
        <span className="footer-copy">© MMXXVI THE LUMINARY ARCHIVE · ALL RIGHTS RESERVED</span>
        <span className="footer-orn">✦ · ✦ · ✦</span>
        <span className="footer-copy">EST. 1887 · CANDLELIT · PERPETUAL</span>
      </div>
    </footer>
  );
}
