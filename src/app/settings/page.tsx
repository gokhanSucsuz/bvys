import Link from 'next/link'
import { getLinks, addLink, deleteLink } from '../actions'

export const dynamic = 'force-dynamic'

export default async function Settings() {
  const links = await getLinks()

  return (
    <main className="container">
      <header className="header">
        <h1>Sistem Ayarları</h1>
        <Link href="/" className="btn">
          ← Panele Dön
        </Link>
      </header>

      <div className="settings-panel">
        <h2>Yeni Sistem Ekle</h2>
        <form action={addLink}>
          <div className="form-group">
            <label htmlFor="title">Sistem Adı</label>
            <input type="text" id="title" name="title" className="form-control" required placeholder="Örn: Analitik Paneli" />
          </div>
          
          <div className="form-group">
            <label htmlFor="url">URL Adresi</label>
            <input type="url" id="url" name="url" className="form-control" required placeholder="https://..." />
          </div>

          <div className="form-group">
            <label htmlFor="description">Açıklama</label>
            <textarea id="description" name="description" className="form-control" rows={3} placeholder="Sistem hakkında kısa bilgi..."></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="color">Vurgu Rengi</label>
            <input type="color" id="color" name="color" className="form-control color-picker" defaultValue="#6366f1" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            + Sisteme Ekle
          </button>
        </form>
      </div>

      <div className="settings-panel">
        <h2>Mevcut Sistemler</h2>
        
        {links.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>Kayıtlı sistem bulunmuyor.</p>
        ) : (
          <div className="list-container">
            {links.map((link) => (
              <div key={link.id} className="list-item">
                <div className="list-item-info">
                  <div className="list-item-title" style={{ color: link.color }}>{link.title}</div>
                  <div className="list-item-url">{link.url}</div>
                </div>
                <form action={deleteLink.bind(null, link.id)}>
                  <button type="submit" className="btn btn-danger">Sil</button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
