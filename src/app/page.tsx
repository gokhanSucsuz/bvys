import Link from 'next/link'
import { getLinks } from './actions'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const links = await getLinks()

  return (
    <main className="container">
      <header className="header">
        <h1>BVS System Panel</h1>
        <Link href="/settings" className="btn btn-primary">
          ⚙️ Ayarlar
        </Link>
      </header>

      {links.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <h2>Henüz eklenmiş bir sistem yok.</h2>
          <p style={{ marginTop: '1rem' }}>Ayarlar sayfasından yeni sistem linkleri ekleyebilirsiniz.</p>
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
