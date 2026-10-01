import Link from 'next/link'
import { getLinks } from './actions'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/options'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session
  const isAdmin = session?.user?.email === 'gokhansucsuz@gmail.com'

  // Sadece giriş yapmış kullanıcılar linkleri görebilir
  const links = isAuthenticated ? await getLinks() : []

  return (
    <main className="container">
      <header className="header">
        <h1>BVYS - Bütünleşik Vakıf Yönetim Sistemi</h1>
        <div>
          {isAuthenticated ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {session.user?.email}
              </span>
              {isAdmin && (
                <Link href="/settings" className="btn btn-primary">
                  ⚙️ Ayarlar
                </Link>
              )}
              <Link href="/api/auth/signout" className="btn">
                Çıkış Yap
              </Link>
            </div>
          ) : (
             <Link href="/api/auth/signin" className="btn btn-primary">
              Sisteme Giriş Yap
            </Link>
          )}
        </div>
      </header>

      {!isAuthenticated ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <h2>Panele Hoş Geldiniz</h2>
          <p style={{ marginTop: '1rem' }}>Sistem linklerini görebilmek için giriş yapmalısınız.</p>
        </div>
      ) : links.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <h2>Henüz eklenmiş bir sistem yok.</h2>
          {isAdmin && <p style={{ marginTop: '1rem' }}>Ayarlar sayfasından yeni sistem linkleri ekleyebilirsiniz.</p>}
        </div>
      ) : (
        <div className="links-grid">
          {links.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="link-card"
              style={{ '--card-color': link.color } as React.CSSProperties}
            >
              <div className="card-header">
                <div className="card-icon-wrapper">
                  {link.title.charAt(0).toUpperCase()}
                </div>
                <h3 className="card-title">{link.title}</h3>
              </div>
              <p className="card-desc">{link.description}</p>
              <div className="card-footer">
                Sisteme Git <span>→</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  )
}
