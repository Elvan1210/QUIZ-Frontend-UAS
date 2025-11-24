import Link from "next/link";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  brand: string;
  rating: number;
};

async function getCategory(category: string) {
  const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=100`, { 
    cache: 'no-store' 
  });
  if (!res.ok) return { products: [] };
  return res.json();
}

export default async function ExplorePage() {
  const [phones, laptops, tablets, accessories, watches] = await Promise.all([
    getCategory('smartphones'),
    getCategory('laptops'),
    getCategory('tablets'),
    getCategory('mobile-accessories'),
    getCategory('mens-watches')
  ]);

  let gadgets: Product[] = [
    ...(phones.products || []), 
    ...(laptops.products || []),
    ...(tablets.products || []),
    ...(accessories.products || []),
    ...(watches.products || [])
  ];

  gadgets = gadgets.sort(() => Math.random() - 0.5);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="text-center mb-5 mt-4">
        <h1 className="fw-bold display-5 text-dark">Mega Gadget Store</h1>
        <p className="text-muted lead">
          Menampilkan <strong>{gadgets.length}+</strong> produk teknologi terbaik dari seluruh dunia.
        </p>
        <Link href="/gadgets" className="btn btn-dark rounded-pill px-5 shadow-sm">
           &larr; Kembali ke Dashboard Saya
        </Link>
      </div>

      {/* Grid Produk */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
        {gadgets.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100 border-0 shadow-sm" style={{ transition: 'transform 0.2s', fontSize: '0.9rem' }}>
              
              {/* Gambar Produk */}
              <div className="position-relative bg-white p-2 d-flex align-items-center justify-content-center border-bottom" 
                   style={{ height: '180px' }}>
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                />
                <span className="badge bg-light text-dark border position-absolute top-0 start-0 m-2" style={{fontSize: '0.7rem'}}>
                  {product.category}
                </span>
              </div>
              
              {/* Info Produk */}
              <div className="card-body bg-white d-flex flex-column p-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.65rem' }}>
                    {product.brand || 'Generic'}
                    </small>
                    <small className="text-warning">★ {product.rating}</small>
                </div>
                
                <h6 className="card-title fw-bold text-truncate mb-3" title={product.title}>
                  {product.title}
                </h6>
                
                <div className="mt-auto pt-2 border-top">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                     <span className="text-dark fw-bold fs-6">${product.price}</span>
                  </div>
                  {/* Tombol Search Google Full Width */}
                  <a 
                    href={`https://www.google.com/search?q=harga+${product.title}+indonesia`} 
                    target="_blank" 
                    className="btn btn-sm btn-outline-primary w-100 d-block"
                  >
                    Cek di Indo 🇮🇩
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Loading kalau kosong */}
      {gadgets.length === 0 && (
          <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p>Mengambil ratusan data...</p>
          </div>
      )}
    </div>
  );
}