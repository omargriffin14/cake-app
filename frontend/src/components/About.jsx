import { useState, useEffect } from 'react'

export default function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="about" style={{ padding: isMobile ? '4rem 1.5rem' : '7rem 2rem', background: 'white' }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '2.5rem' : '5rem',
        alignItems: 'center',
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            borderRadius: isMobile ? '60px 60px 60px 20px' : '120px 120px 120px 40px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(44,40,40,0.15)',
            aspectRatio: '3/4',
            maxWidth: isMobile ? '280px' : '100%',
            margin: isMobile ? '0 auto' : '0',
          }}>
            <img src="/assets/onela.jpeg" alt="Onela" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            right: isMobile ? '10px' : '-20px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#FBEAF0',
            zIndex: -1,
          }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="section-label">Meet the Baker</span>
          <h2 style={{
            fontSize: isMobile ? '36px' : 'clamp(36px, 4vw, 52px)',
            fontWeight: '400',
            color: '#2C2828',
            marginBottom: '1.5rem',
            fontFamily: 'Playfair Display, serif',
          }}>Hi, I'm Onela</h2>
          <div style={{ width: '48px', height: '2px', background: '#D4537E', marginBottom: '1.75rem' }} />
          <p style={para}>Baking is truly my love language.</p>
          <p style={para}>I've been creating custom cakes for over 12 years, trained in the culinary arts in South Africa where my passion for food and people first came alive. There's something magical about watching simple ingredients transform into something beautiful, and that magic never gets old for me. Now calling Raleigh, NC home, I bring that same joy and intention to every single cake I make.</p>
          <p style={para}>What sets my cakes apart is the balance. I believe dessert should delight every part of your palate — not just your sweet tooth. My cakes are crafted with a savory sensibility that's often overlooked in baking, creating flavors that are rich, layered, and truly memorable.</p>
          <p style={para}>Every cake I make is handcrafted to order, because your celebration deserves something made with care, made with detail, and made just for you. Whether it's a birthday, a baby shower, a wedding, or simply a moment worth marking — I would love to be part of it.</p>
          <p style={{ ...para, fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '19px', color: '#D4537E' }}>Let's make something beautiful together.</p>
        </div>
      </div>
    </section>
  )
}

const para = {
  fontSize: '15px',
  lineHeight: '1.85',
  color: '#5A5252',
  fontWeight: '300',
  marginBottom: '1.25rem',
}
