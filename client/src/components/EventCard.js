import React from 'react';

export default function EventCard({ ev, onRegister, user }) {
  const d = new Date(ev.date);
  return (
    <div className="card">
      <h3>{ev.title}</h3>
      <div style={{fontSize:13, color:'#555'}}>{d.toLocaleString()}</div>
      <div style={{marginTop:8}}>{ev.description?.slice(0,120)}</div>
      <div style={{marginTop:8}}>Venue: {ev.venue || 'TBA'}</div>
      <div style={{marginTop:8}}>Capacity: {ev.capacity}</div>
      <div style={{marginTop:10}}>
        <button onClick={()=>onRegister(ev._id)} disabled={!user}>Register</button>
        {!user && <span style={{marginLeft:8, color:'#777'}}>Login to register</span>}
      </div>
    </div>
  );
}
