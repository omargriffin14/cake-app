import { useState, useEffect } from 'react'

export default function Navbar({ onOrderClick, onSpecialsClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(44,40,40,0.08)',
        boxShadow: scrolled ? '0 2px 20px rgba(44,40,40,0.08)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logo.png" alt="Nelas Bakery" style={{ height: '90px', width: 'auto' }} />
          </a>

          {isMobile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="btn-primary" onClick={onOrderClick} style={{ padding: '10px 18px', fontSize: '12px' }}>
                Order Now
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}>
                <span style={{ display: 'block', width: '22px', height: '2px', background: '#2C2828' }}/>
                <span style={{ display: 'block', width: '22px', height: '2px', background: '#2C2828' }}/>
                <span style={{ display: 'block', width: '22px', height: '2px', background: '#2C2828' }}/>
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '2.5rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <a href="#gallery" style={navLink}>Gallery</a>
                <a href="#about" style={navLink}>About</a>
                <a href="#contact" style={navLink}>Contact</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <a href="https://instagram.com/nelasbakeryofficial" target="_blank" rel="noreferrer" style={{ color: '#7A7070', display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@nelasbakeryofficial" target="_blank" rel="noreferrer" style={{ color: '#7A7070', display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                  </svg>
                </a>
                <button className="btn-primary" onClick={onOrderClick} style={{ padding: '10px 22px', fontSize: '12px' }}>
                  Order Now
                </button>
              </div>
            </>
          )}
        </div>
      </nav>

      {menuOpen && isMobile && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          zIndex: 99,
          background: 'rgba(255,255,255,0.98)',
          borderBottom: '1px solid rgba(44,40,40,0.08)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          <a href="#gallery" style={mobileNavLink} onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#about" style={mobileNavLink} onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" style={mobileNavLink} onClick={() => setMenuOpen(false)}>Contact</a>
          <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(44,40,40,0.08)' }}>
            <a href="https://instagram.com/nelasbakeryofficial" target="_blank" rel="noreferrer" style={{ color: '#7A7070', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              Instagram
            </a>
            <a href="https://tiktok.com/@nelasbakeryofficial" target="_blank" rel="noreferrer" style={{ color: '#7A7070', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
              TikTok
            </a>
          </div>
        </div>
      )}
    </>
  )
}

const navLink = {
  fontFamily: 'Raleway, sans-serif',
  fontSize: '13px',
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#2C2828',
  textDecoration: 'none',
}

const mobileNavLink = {
  fontFamily: 'Raleway, sans-serif',
  fontSize: '15px',
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#2C2828',
  textDecoration: 'none',
}

// v1.1
