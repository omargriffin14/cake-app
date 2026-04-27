const FLAVORS = [
  { name: 'Strawberry Rose', description: 'Vanilla sponge, rose cream, fresh berries' },
  { name: 'Lemon Blueberry', description: 'Chiffon, blueberry compote, lemon cream' },
  { name: 'Choc Raspberry', description: 'Dark chocolate, jam centre, ganache' },
]

const QUANTITIES = [
  { label: 'Mini set', count: 3, price: 12 },
  { label: 'Gift box', count: 6, price: 20 },
  { label: 'Party pack', count: 12, price: 35 },
]

export default function SpecialsStepTwo({ form, update, next, back }) {
  const valid = form.flavor && form.quantity

  return (
    <div>
      <div style={card}>
        <p style={sectionTitle}>CHOOSE YOUR FLAVOR</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {FLAVORS.map(f => (
            <div
              key={f.name}
              onClick={() => update({ flavor: f.name })}
              style={{
                ...flavorCard,
                borderColor: form.flavor === f.name ? '#D4537E' : 'rgba(44,40,40,0.12)',
                background: form.flavor === f.name ? '#FBEAF0' : 'white',
              }}
            >
              <p style={{ fontWeight: '500', fontSize: '14px', color: '#2C2828', margin: 0 }}>{f.name}</p>
              <p style={{ fontSize: '13px', color: '#7A7070', margin: '4px 0 0' }}>{f.description}</p>
            </div>
          ))}
        </div>

        <p style={sectionTitle}>HOW MANY CUPCAKES?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {QUANTITIES.map(q => (
            <div
              key={q.label}
              onClick={() => update({ quantity: `${q.label} (${q.count})`, quantity_price: q.price })}
              style={{
                ...quantityCard,
                borderColor: form.quantity === `${q.label} (${q.count})` ? '#D4537E' : 'rgba(44,40,40,0.12)',
                background: form.quantity === `${q.label} (${q.count})` ? '#FBEAF0' : 'white',
              }}
            >
              <p style={{ fontSize: '24px', fontWeight: '400', color: '#2C2828', margin: 0, fontFamily: 'Playfair Display, serif' }}>{q.count}</p>
              <p style={{ fontSize: '12px', color: '#7A7070', margin: '4px 0' }}>{q.label}</p>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#D4537E', margin: 0 }}>${q.price}</p>
            </div>
          ))}
        </div>

        <p style={sectionTitle}>SPECIAL INSTRUCTIONS</p>
        <div className="field">
          <textarea
            value={form.special_instructions}
            onChange={e => update({ special_instructions: e.target.value })}
            placeholder="Allergy notes, name to pipe on cupcake, gift message..."
            rows={3}
          />
        </div>
      </div>
      <div style={actions}>
        <button className="btn-secondary" onClick={back}>← Back</button>
        <button className="btn-primary" onClick={next} disabled={!valid}>Review order →</button>
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
  marginBottom: '0.75rem'
}
const flavorCard = {
  border: '1px solid',
  borderRadius: '10px',
  padding: '1rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
}
const quantityCard = {
  border: '1px solid',
  borderRadius: '10px',
  padding: '1rem',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'all 0.2s ease',
}
const actions = { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '1rem' }
