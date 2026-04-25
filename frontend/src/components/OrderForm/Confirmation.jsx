export default function Confirmation({ name, form }) {
  const display = (field, other) =>
    form[field] === 'other' ? form[other] : form[field]

  return (
    <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
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

      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: '400', marginBottom: '0.5rem' }}>
        Order received!
      </h2>
      <p style={{ color: '#7A7070', fontSize: '15px', marginBottom: '2rem', lineHeight: '1.6' }}>
        Thank you, {name}! We have received your order and will reach out to you shortly with pricing, a due date, and any additional details needed to complete your order.
      </p>

      <div style={{
        background: '#FAF6F1',
        border: '1px solid rgba(44,40,40,0.1)',
        borderRadius: '12px',
        padding: '1.5rem',
        textAlign: 'left',
        marginBottom: '1.5rem'
      }}>
        <p style={sectionTitle}>ORDER SUMMARY</p>
        {[
          { label: 'Flavor', value: display('cake_flavor', 'cake_flavor_other') },
          { label: 'Shape', value: display('shape', 'shape_other') },
          { label: 'Height', value: display('height', 'height_other') },
          { label: 'Size', value: display('size', 'size_other') },
          { label: 'Border', value: display('border', 'border_other') },
          { label: 'Notes', value: form.custom_notes || '—' },
          { label: 'Image', value: form.image ? form.image.name : 'None' }
        ].map(({ label, value }) => (
          <div key={label} style={row}>
            <span style={{ color: '#7A7070' }}>{label}</span>
            <span style={{ fontWeight: '500' }}>{value}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '13px', color: '#aaa', letterSpacing: '0.1em' }}>
        SWEETS MADE TO LOVE
      </p>
    </div>
  )
}

const sectionTitle = {
  fontSize: '13px',
  fontWeight: '600',
  letterSpacing: '0.07em',
  color: '#7A7070',
  marginBottom: '1rem'
}

const row = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
  borderBottom: '1px solid rgba(44,40,40,0.08)',
  fontSize: '14px'
}
