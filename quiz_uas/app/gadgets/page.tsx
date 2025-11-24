"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Gadget = {
  id: number;
  name: string;
  brand: string;
  price: number;
};

export default function GadgetListPage() {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [search, setSearch] = useState(""); // State untuk Search
  const [form, setForm] = useState({ name: "", brand: "", price: "" });
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gadgets", { cache: 'no-store' });
      const data = await res.json();
      setGadgets(data);
    } catch (error) { 
      console.error(error); 
    } finally { 
      setIsLoading(false); 
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.price) return alert("Isi semua data!");
    
    await fetch("/api/gadgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    
    setForm({ name: "", brand: "", price: "" });
    fetchData();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus gadget ini dari database?")) {
      await fetch(`/api/gadgets/${id}`, { method: "DELETE" });
      fetchData();
    }
  };

  const filteredGadgets = gadgets.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-3">
      {/* Dashboard Header & Search Bar */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-6">
          <h2 className="fw-bold text-dark mb-0">My Electronics Dashboard</h2>
          <p className="text-muted mb-0">Kelola inventaris dan wishlist gadget impianmu.</p>
        </div>
        <div className="col-md-6 mt-3 mt-md-0">
          <div className="input-group shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
            <span className="input-group-text bg-white border-0 ps-3">🔍</span>
            <input 
              type="text" 
              className="form-control form-control-lg border-0" 
              placeholder="Cari gadget (iPhone, Samsung, PS5)..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* KOLOM KIRI: Form Input */}
        <div className="col-lg-4">
          <div className="card border-0 shadow p-4" style={{ borderRadius: '15px', background: '#fff' }}>
            <h5 className="fw-bold mb-4 text-primary d-flex align-items-center">
              <span className="me-2">➕</span> Input Data Baru
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="small text-muted fw-bold">NAMA GADGET</label>
                <input type="text" className="form-control bg-light border-0 py-2" placeholder="Contoh: PS5 Slim" 
                  value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
              </div>
              <div className="mb-3">
                <label className="small text-muted fw-bold">BRAND / MERK</label>
                <input type="text" className="form-control bg-light border-0 py-2" placeholder="Contoh: Sony" 
                  value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})} />
              </div>
              <div className="mb-4">
                <label className="small text-muted fw-bold">ESTIMASI HARGA (IDR)</label>
                <input type="number" className="form-control bg-light border-0 py-2" placeholder="0" 
                  value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
              </div>
              <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold shadow-sm py-2">
                Simpan ke Database
              </button>
            </form>
          </div>
        </div>

        {/* KOLOM KANAN: List Data */}
        <div className="col-lg-8">
          {isLoading ? (
             <div className="text-center py-5">
               <div className="spinner-border text-primary" role="status"></div>
               <p className="mt-2 text-muted">Memuat data...</p>
             </div>
          ) : (
            <div className="row">
              <div className="col-12 mb-3 d-flex justify-content-between">
                 <span className="text-muted fw-bold">Total Item: {filteredGadgets.length}</span>
                 {search && <span className="text-primary">Hasil pencarian untuk "{search}"</span>}
              </div>

              {filteredGadgets.length === 0 ? (
                <div className="col-12 text-center text-muted py-5 card border-0 shadow-sm">
                  <h4>Gadget tidak ditemukan 😔</h4>
                  <p>Coba kata kunci lain atau tambahkan data baru di formulir samping.</p>
                </div>
              ) : (
                filteredGadgets.map((item) => (
                  <div key={item.id} className="col-12 mb-3">
                    <div className="card border-0 shadow-sm p-3 hover-card" style={{ borderRadius: '15px' }}>
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        
                        {/* Bagian Kiri Card */}
                        <div className="d-flex align-items-center w-100 mb-3 mb-md-0">
                          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" 
                               style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                            📱
                          </div>
                          <div style={{ overflow: 'hidden' }}>
                            <h5 className="fw-bold mb-0 text-dark text-truncate">{item.name}</h5>
                            <small className="text-muted text-uppercase fw-bold">{item.brand}</small>
                          </div>
                        </div>

                        {/* Bagian Kanan Card */}
                        <div className="text-md-end w-100 w-md-auto ps-md-3">
                          <h5 className="fw-bold text-success mb-2">
                            Rp {item.price.toLocaleString('id-ID')}
                          </h5>
                          <div className="btn-group w-100">
                             <Link href={`/gadgets/${item.id}`} className="btn btn-sm btn-outline-primary rounded-pill me-2 px-3">
                               Detail
                             </Link>
                             <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-outline-danger rounded-pill px-3">
                               Hapus
                             </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}