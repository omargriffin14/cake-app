import { useState, useEffect } from 'react'

export default function Specials({ onOrderClick }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="specials" style={section}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '2.5rem' : '5rem',
        alignItems: 'center',
      }}>
        <div style={textCol}>
          <span className="section-label">Limited Time</span>
          <h2 style={{
            ...heading,
            fontSize: isMobile ? '32px' : 'clamp(32px, 4vw, 48px)',
          }}>Mother's Day Minis</h2>
          <div style={divider} />
          <p style={sub}>
            Celebrate the special women in your life with a beautiful set of handcrafted mini cupcakes.
            Made with love and care, each cupcake is a little gift worth savoring.
          </p>

          <div style={flavorList}>
            {[
              { name: 'Strawberry Rose', desc: 'Vanilla sponge, rose cream, strawberry jam' },
              { name: 'Lemon Blueberry', desc: 'Lemon cake, blueberry compote, lemon cream' },
              { name: 'Choc Raspberry', desc: 'Chocolate cake, jam centre, chocolate buttercream' },
            ].map(f => (
              <div key={f.name} style={flavorItem}>
                <p style={{ fontWeight: '500', fontSize: '14px', color: '#2C2828', margin: 0 }}>{f.name}</p>
                <p style={{ fontSize: '13px', color: '#7A7070', margin: '2px 0 0' }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <div style={priceRow}>
            {[
              { label: 'Mini set', count: 3, price: 12 },
              { label: 'Gift box', count: 6, price: 20 },
              { label: 'Party pack', count: 12, price: 35 },
            ].map(p => (
              <div key={p.label} style={priceCard}>
                <p style={{ fontSize: '28px', fontWeight: '400', fontFamily: 'Playfair Display, serif', color: '#2C2828', margin: 0 }}>{p.count}</p>
                <p style={{ fontSize: '12px', color: '#7A7070', margin: '4px 0' }}>{p.label}</p>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#D4537E', margin: 0 }}>${p.price}</p>
              </div>
            ))}
          </div>

          <p style={deadline}>Order by May 8th — Limited availability</p>

          <button className="btn-primary" onClick={onOrderClick} style={{ marginTop: '1.5rem' }}>
            Order Now
          </button>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          order: isMobile ? 1 : 0,
        }}>
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            width: '100%',
            aspectRatio: isMobile ? '16/9' : '4/5',
          }}>
            <img
              src="/assets/MothersDay.jpg"
              alt="Mother's Day Mini Cupcakes"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const section = {
  padding: '7rem 2rem',
  background: '#FAF6F1',
}

const textCol = {
  display: 'flex',
  flexDirection: 'column',
}

const heading = {
  fontWeight: '400',
  color: '#2C2828',
  marginBottom: '1rem',
  fontFamily: 'Playfair Display, serif',
}

const divider = {
  width: '48px',
  height: '2px',
  background: '#D4537E',
  marginBottom: '1.5rem',
}

const sub = {
  fontSize: '15px',
  lineHeight: '1.85',
  color: '#5A5252',
  fontWeight: '300',
  marginBottom: '1.5rem',
}

const flavorList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  marginBottom: '1.5rem',
}

const flavorItem = {
  padding: '0.75rem 1rem',
  background: 'white',
  borderRadius: '8px',
  border: '1px solid rgba(44,40,40,0.08)',
}

const priceRow = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '0.75rem',
  marginBottom: '1rem',
}

const priceCard = {
  textAlign: 'center',
  padding: '1rem',
  background: 'white',
  borderRadius: '10px',
  border: '1px solid rgba(44,40,40,0.08)',
}

const deadline = {
  fontSize: '13px',
  color: '#D4537E',
  fontWeight: '500',
  letterSpacing: '0.04em',
}
