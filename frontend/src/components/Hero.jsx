export default function Hero({ onOrderClick }) {
  return (
    <section style={heroWrap}>
      <div style={overlay} />
      <img src="/assets/cake3.png" alt="Hero cake" style={heroImg} />
      <div style={heroContent}>
        <span className="section-label" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Handcrafted to order · Raleigh, NC
        </span>
        <h1 style={heroTitle}>
          Sweets Made<br />
          <em>to Love</em>
        </h1>
        <p style={heroSub}>
          Custom cakes crafted with intention, balance, and heart.
        </p>
        <button className="btn-outline-white" onClick={onOrderClick}>
          Order Now
        </button>
      </div>
    </section>
  )
}

const heroWrap = {
  position: 'relative',
  height: '100vh',
  minHeight: '600px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}

const heroImg = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
}

const overlay = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom, rgba(44,40,40,0.35) 0%, rgba(44,40,40,0.55) 100%)',
  zIndex: 1,
}

const heroContent = {
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: 'white',
  padding: '0 1.5rem',
  maxWidth: '600px',
}

const heroTitle = {
  fontSize: 'clamp(52px, 8vw, 88px)',
  fontWeight: '400',
  lineHeight: '1.1',
  marginBottom: '1.25rem',
  textShadow: '0 2px 20px rgba(0,0,0,0.2)',
}

const heroSub = {
  fontSize: '16px',
  fontWeight: '300',
  letterSpacing: '0.04em',
  marginBottom: '2.5rem',
  opacity: '0.9',
}
