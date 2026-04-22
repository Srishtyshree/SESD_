export function RosetteIcon() {
  return (
    <svg className="rosette" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" stroke="#c9a252" strokeWidth=".8"/>
      <circle cx="50" cy="50" r="38" stroke="#c9a252" strokeWidth=".5" strokeDasharray="3 3"/>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return <line key={i} x1={50+20*Math.cos(a)} y1={50+20*Math.sin(a)} x2={50+46*Math.cos(a)} y2={50+46*Math.sin(a)} stroke="#c9a252" strokeWidth=".5"/>;
      })}
      <circle cx="50" cy="50" r="10" stroke="#c9a252" strokeWidth=".8"/>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return <ellipse key={i} cx={50+25*Math.cos(a)} cy={50+25*Math.sin(a)} rx="7" ry="3.5" stroke="#c9a252" strokeWidth=".5" fill="none" transform={`rotate(${i*45} ${50+25*Math.cos(a)} ${50+25*Math.sin(a)})`}/>;
      })}
    </svg>
  );
}
