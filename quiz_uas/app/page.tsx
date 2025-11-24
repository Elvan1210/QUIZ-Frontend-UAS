import Link from "next/link";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <div className="card shadow">
        <div className="card-body py-5">
          <h1 className="display-4 mb-3">Website Pencarian Gadgets</h1>
            <hr className="w-50 mx-auto" />
          <h3 className="mt-4">Nama: Elvan Mariano</h3>
          <h4>NIM: 535240133</h4>
          <p className="lead mt-4 font-weight-bold">
            Topik Project: <strong>Gadget Wishlist Manager</strong>
          </p>
          <p className="text-muted mb-5">
            Aplikasi untuk mencatat gadget impian yang ingin dibeli.
          </p>
          
          {/* PERBAIKAN DISINI: Menggunakan Link ke arah /gadgets */}
          <Link href="/gadgets" className="btn btn-primary btn-lg px-5">
            Mulai Aplikasi
          </Link>
        </div>
      </div>
    </div>
  );
}