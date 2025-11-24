import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";


export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gadgetID = Number(id);

  if (isNaN(gadgetID)) {
    return notFound();
  }

  const item = await prisma.gadget.findUnique({
    where: { id: gadgetID },
  });

  if (!item) return notFound();

  return (
    <div className="container mt-5 mb-5">
      {/* Tombol Back */}
      <Link href="/gadgets" className="text-decoration-none text-muted mb-4 d-inline-block fw-bold">
        &larr; Kembali ke Dashboard
      </Link>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
            
            {/* BAGIAN ATAS: Header & Visual */}
            <div className="bg-dark text-white p-5 text-center position-relative">
              <div className="position-absolute top-0 start-0 w-100 h-100" 
                   style={{ background: 'linear-gradient(45deg, #2c3e50, #000000)', opacity: 0.8, zIndex: 0 }}></div>
              
              <div className="position-relative" style={{ zIndex: 1 }}>
                <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" 
                     style={{ width: '100px', height: '100px', fontSize: '3rem' }}>
                  📱
                </div>
                <h1 className="display-5 fw-bold">{item.name}</h1>
                <p className="lead text-light opacity-75 text-uppercase letter-spacing-2">{item.brand}</p>
                <div className="mt-4">
                  <span className="badge bg-success fs-4 px-4 py-2 rounded-pill shadow">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            {/* BAGIAN BAWAH: Detail Informasi */}
            <div className="card-body p-5 bg-white">
              <div className="row g-5">
                
                {/* Kolom Kiri: Informasi Utama */}
                <div className="col-md-6 border-end">
                  <h4 className="fw-bold mb-4 text-primary">📦 Informasi Item</h4>
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td className="text-muted fw-bold">ID Database</td>
                        <td className="fw-bold text-end">#{item.id}</td>
                      </tr>
                      <tr>
                        <td className="text-muted fw-bold">Tanggal Input</td>
                        <td className="fw-bold text-end">{item.createdAt.toLocaleDateString('id-ID')}</td>
                      </tr>
                      <tr>
                        <td className="text-muted fw-bold">Kategori</td>
                        <td className="fw-bold text-end">Elektronik / Gadget</td>
                      </tr>
                      <tr>
                        <td className="text-muted fw-bold">Status</td>
                        <td className="text-end"><span className="badge bg-info text-dark">Wishlist Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="alert alert-light border mt-4">
                    <small className="text-muted">
                      ℹ️ <strong>Catatan:</strong> Item ini tersimpan aman di database lokal kamu (SQLite).
                    </small>
                  </div>
                </div>

                {/* Kolom Kanan: Spesifikasi Teknis (Link Eksternal) */}
                <div className="col-md-6">
                  <h4 className="fw-bold mb-4 text-dark">⚙️ Spesifikasi Teknis</h4>
                  <p className="text-muted mb-4">
                    Lihat detail lengkap (RAM, Chipset, Kamera) dari sumber eksternal:
                  </p>

                  <div className="d-grid gap-3">
                    <a href={`https://www.google.com/search?q=spesifikasi+lengkap+${item.name}+gsmarena`} 
                       target="_blank" 
                       className="btn btn-outline-dark btn-lg text-start d-flex justify-content-between align-items-center">
                       <span>🔍 Cek Spesifikasi Lengkap</span>
                       <span>&rarr;</span>
                    </a>
                    
                    <a href={`https://www.youtube.com/results?search_query=review+${item.name}+indonesia`} 
                       target="_blank" 
                       className="btn btn-outline-danger btn-lg text-start d-flex justify-content-between align-items-center">
                       <span>📺 Tonton Review YouTube</span>
                       <span>&rarr;</span>
                    </a>

                     <a href={`https://www.tokopedia.com/search?q=${item.name}`} 
                       target="_blank" 
                       className="btn btn-outline-success btn-lg text-start d-flex justify-content-between align-items-center">
                       <span>🛒 Cek Harga Pasar</span>
                       <span>&rarr;</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Footer Card */}
            <div className="card-footer bg-light p-4 text-center border-top">
              <Link href="/gadgets" className="btn btn-primary px-5 rounded-pill fw-bold">
                Kembali ke Dashboard
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}