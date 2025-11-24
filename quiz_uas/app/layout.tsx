import "bootstrap/dist/css/bootstrap.min.css"; 
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elvan Gadget Store",
  description: "Pncarian Gadgets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={inter.className} 
        style={{ 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
          minHeight: '100vh' 
        }}
      >
        {/* Navbar dengan efek Glassmorphism (Blur) */}
        <nav 
          className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top mb-4" 
          style={{ backdropFilter: 'blur(10px)', opacity: 0.95 }}
        >
          <div className="container">
             <a className="navbar-brand fw-bold" href="/">ElvanApp 📱</a>
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
               <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNav">
               <div className="navbar-nav ms-auto">
                 <a className="nav-link" href="/gadgets">My Dashboard</a>
                 <a className="nav-link" href="/explore">Explore Store</a>
               </div>
             </div>
          </div>
        </nav>
        
        {/* Container Utama */}
        <div className="pb-5">
          {children}
        </div>
      </body>
    </html>
  );
}