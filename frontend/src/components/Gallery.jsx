const cakes = [
  { src: '/assets/cake1.jpeg', label: 'Birthday Celebration' },
  { src: '/assets/cake2.jpeg', label: 'Baby Shower' },
  { src: '/assets/cake3.png',  label: 'Elegant Custom' },
  { src: '/assets/cake4.jpeg', label: 'Kids Party' },
]

export default function Gallery() {
  return (
    <section id="gallery" style={section}>
      <div style={inner}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">Our Work</span>
          <h2 style={heading}>A Taste of What We Create</h2>
          <p style={sub}>Every cake is a one-of-a-kind creation, made just for your moment.</p>
        </div>
        <div style={grid}>
          {cakes.map((cake, i) => (
            <div key={i} style={card}>
              <div style={imgWrap}>
                <img src={cake.src} alt={cake.label} style={img} />
                <div style={imgOverlay}>
                  <span style={imgLabel}>{cake.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const section = {
  padding: '7rem 2rem',
  background: '#FAF6F1',
}

const inner = {
  maxWidth: '1200px',
  margin: '0 auto',
}

const heading = {
  fontSize: 'clamp(32px, 5vw, 48px)',
  fontWeight: '400',
  color: '#2C2828',
  marginBottom: '1rem',
}

const sub = {
  fontSize: '15px',
  color: '#7A7070',
  fontWeight: '300',
  maxWidth: '480px',
  margin: '0 auto',
  lineHeight: '1.7',
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '1.5rem',
}

const card = {
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(44,40,40,0.08)',
}

const imgWrap = {
  position: 'relative',
  paddingBottom: '110%',
  overflow: 'hidden',
}

const img = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  transition: 'transform 0.5s ease',
}

const imgOverlay = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '2rem 1.25rem 1.25rem',
  background: 'linear-gradient(to top, rgba(44,40,40,0.7) 0%, transparent 100%)',
  display: 'flex',
  alignItems: 'flex-end',
}

const imgLabel = {
  color: 'white',
  fontFamily: 'Playfair Display, serif',
  fontSize: '16px',
  fontStyle: 'italic',
}
