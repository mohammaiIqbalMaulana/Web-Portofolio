"use client";
import {useState} from 'react';

export default function ContactPage(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, message})
    });
    if (res.ok) setStatus('Terkirim. Cek Mailtrap inbox.');
    else {
      const data = await res.json().catch(()=>({error:'Gagal'}));
      setStatus(data.error || 'Gagal mengirim');
    }
  };

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Kontak</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="border rounded px-3 py-2 w-full" placeholder="Nama" value={name} onChange={e=>setName(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <textarea className="border rounded px-3 py-2 w-full" placeholder="Pesan" value={message} onChange={e=>setMessage(e.target.value)} />
        <button className="bg-primary text-white px-4 py-2 rounded" type="submit">Kirim</button>
      </form>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </main>
  );
}


