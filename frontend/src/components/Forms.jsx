import { useState } from "react";
import * as api from "../api";

export function SignInForm({ onClose, onJoin, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api.login(email, password);
      onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div style={{ color: '#ff6b6b', fontSize: '12px', marginBottom: '16px', fontStyle: 'italic' }}>{error}</div>}
      <div className="form-group">
        <label className="form-label">EMAIL ADDRESS</label>
        <input className="form-input" type="email" placeholder="librarian@archive.org" required value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">PASSWORD</label>
        <input className="form-input" type="password" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button className="btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={loading}>
        {loading ? 'OPENING ARCHIVE...' : 'SIGN IN'}
      </button>
      <div className="form-footer">
        Don't have an account? <a onClick={onJoin}>Sign Up</a>
      </div>
    </form>
  );
}

export function JoinForm({ onClose, onSignIn, onSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const data = await api.signup(formData.username, formData.email, formData.password);
      onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div style={{ color: '#ff6b6b', fontSize: '12px', marginBottom: '16px', fontStyle: 'italic' }}>{error}</div>}
      {step === 1 ? (
        <>
          <div className="form-group">
            <label className="form-label">CHOOSE A PSEUDONYM</label>
            <input className="form-input" placeholder="e.g. ParchmentExplorer" required value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">EMAIL ADDRESS</label>
            <input className="form-input" type="email" placeholder="your@email.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          </div>
        </>
      ) : (
        <div className="form-group">
          <label className="form-label">CHOOSE A PASSWORD</label>
          <input className="form-input" type="password" placeholder="A simple password works" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
        </div>
      )}
      <button className="btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={loading}>
        {loading ? 'ARCHIVING...' : step === 1 ? 'NEXT STEP' : 'COMPLETE REGISTRATION'}
      </button>
      <div className="form-footer">
        Already have an account? <a onClick={onSignIn}>Sign in to your account</a>
      </div>
    </form>
  );
}
