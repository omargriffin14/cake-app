export default function Navbar({ onOrderClick }) {
  return (
    <nav style={nav}>
      <div style={navInner}>

        {/* Logo left */}
        <div style={logoWrap}>
          <img
            src="/assets/logo.png"
            alt="Nela's Bakery"
            style={{ height: '52px', width: 'auto' }}
          />
        </div>

        {/* Center links */}
        <div style={navLinks}>
          {['Gallery', 'About', 'Contact'].map(link => (
            
              key={link}
              href={`#${link.toLowerCase()}`}
              style={navLink}
              onMouseEnter={e => e.target.style.color = '#D4537E'}
              onMouseLeave={e => e.target.style.color = '#2C2828'}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social links right */}
        <div style={socialWrap}>
          <a href="https://instagram.com/nelasbakeryofficial" target="_blank" rel="noreferrer" style={socialLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://tiktok.com/@nelasbakeryofficial" target="_blank" rel="noreferrer" style={socialLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
            </svg>
          </a>
          <button className="btn-primary" onClick={onOrderClick} style={{ padding: '10px 22px', fontSize: '12px' }}>
            Order Now
          </button>
        </div>

      </div>
    </nav>
  )
}

const nav = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(44,40,40,0.08)',
}

const navInner = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  height: '72px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const logoWrap = { flex: '0 0 auto' }

const navLinks = {
  display: 'flex',
  gap: '2.5rem',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
}

const navLink = {
  fontFamily: 'Raleway, sans-serif',
  fontSize: '13px',
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#2C2828',
  textDecoration: 'none',
  transition: 'color 0.2s',
}

const socialWrap = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  flex: '0 0 auto',
}

const socialLink = {
  color: '#7A7070',
  display: 'flex',
  alignItems: 'center',
  transition: 'color 0.2s',
}
