import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="container text-center mt-5 pt-5">
      <div className="alert alert-danger display-1">404</div>
      <h2>Oops! Halaman Hilang</h2>
      <p>Halaman yang kamu cari tidak ada di dalam sistem kami.</p>
      <Link href="/" className="btn btn-outline-dark">
        Kembali ke Home
      </Link>
    </div>
  )
}