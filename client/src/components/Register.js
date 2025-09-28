import React, { useState } from 'react';
import API, { setAuthToken } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Register({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { name, email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuthToken(token);
      setUser(user);
      nav('/');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form className="form" onSubmit={submit}>
        <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="action"><button>Create account</button>{msg && <div style={{color:'red'}}>{msg}</div>}</div>
      </form>
    </div>
  );
}
