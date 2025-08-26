"use client";
import {signIn} from 'next-auth/react';
import {useState} from 'react';
import {useRouter, usePathname} from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });
    if (res?.ok) {
      const locale = pathname?.split('/')?.[1] || 'id';
      router.push(`/${locale}/admin`);
    } else {
      setError('Email atau password salah');
    }
  };

  return (
    <main className="p-8 max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="border rounded px-3 py-2 w-full" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-primary text-white px-4 py-2 rounded" type="submit">Login</button>
      </form>
    </main>
  );
}


