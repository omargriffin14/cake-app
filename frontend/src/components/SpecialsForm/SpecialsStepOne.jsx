export default function SpecialsStepOne({ form, update, next }) {
  const valid = form.customer_name && form.customer_email

  return (
    <div>
      <div style={card}>
        <p style={sectionTitle}>CONTACT INFORMATION</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={grid2}>
            <div className="field">
              <label>Full name</label>
              <input
                value={form.customer_name}
                onChange={e => update({ customer_name: e.target.value })}
                placeholder="Jane Smith"
              />
            </div>
            <div className="field">
              <label>Phone number</label>
              <input
                value={form.customer_phone}
                onChange={e => update({ customer_phone: e.target.value })}
                placeholder="(555) 000-0000"
              />
            </div>
          </div>
          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              value={form.customer_email}
              onChange={e => update({ customer_email: e.target.value })}
              placeholder="jane@email.com"
            />
          </div>
        </div>
      </div>
      <div style={actions}>
        <button className="btn-primary" onClick={next} disabled={!valid}>
          Next →
        </button>
      </div>
    </div>
  )
}

const card = {
  background: 'white',
  border: '1px solid rgba(44,40,40,0.12)',
  borderRadius: '12px',
  padding: '1.5rem',
  marginBottom: '1rem'
}
const sectionTitle = {
  fontSize: '13px',
  fontWeight: '600',
  letterSpacing: '0.07em',
  color: '#7A7070',
  marginBottom: '1rem'
}
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }
const actions = { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '1rem' }
