// src/components/MyRegistrations.js
import React, { useEffect, useState } from 'react';
import API from '../utils/api';

export default function MyRegistrations({ user }) {
  const [regs, setRegs] = useState([]);
  const [msg, setMsg] = useState('');

  // Fetch registrations for current user
  const fetchRegs = async () => {
    try {
      const res = await API.get('/registrations/me'); // backend endpoint
      setRegs(res.data);
      setMsg('');
    } catch (err) {
      console.error(err);
      setMsg('Could not fetch registrations');
    }
  };

  // Cancel a registration
  const cancel = async (evId) => {
    try {
      await API.post(`/registrations/${evId}/cancel`);
      setMsg('Registration canceled');
      fetchRegs(); // refresh list
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || 'Cancel failed');
    }
  };

  useEffect(() => {
    fetchRegs();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Registrations</h2>
      {msg && <div style={{ color: 'green', marginBottom: 12 }}>{msg}</div>}
      {regs.length === 0 && <div>No registrations yet</div>}
      <div>
        {regs.map((r) => (
          <div key={r._id} className="card" style={{ marginBottom: 8, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
            <b>{r.title}</b>
            <div>{new Date(r.date).toLocaleString()}</div>
            <div style={{ marginTop: 8 }}>
              {r.status || 'Registered'}
              <button onClick={() => cancel(r._id)} style={{ marginLeft: 12 }}>
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
