export default function Confirmation({ name }) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid rgba(58,53,53,0.12)',
      borderRadius: '12px',
      padding: '3rem 2rem',
      textAlign: 'center',
      marginTop: '1rem'
    }}>
      <div style={{
        width: '60px', height: '60px', borderRadius: '50%',
        background: '#FBEAF0', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.5rem'
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 14l6 6L22 8" stroke="#D4537E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 style={{ fontSize: '26px', marginBottom: '0.75rem' }}>Order received!</h2>
      <p style={{ color: '#7A7070', lineHeight: '1.6' }}>
        Thank you, {name}! A confirmation has been sent to your email.<br />
        Nela will be in touch shortly to confirm your order.
      </p>
      <p style={{ marginTop: '2rem', fontSize: '13px', color: '#aaa', letterSpacing: '0.1em' }}>
        SWEETS MADE TO LOVE
      </p>
    </div>
  )
}
