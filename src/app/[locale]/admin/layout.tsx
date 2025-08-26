export default function AdminLayout({children}:{children: React.ReactNode}){
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>
      {children}
    </section>
  );
}


