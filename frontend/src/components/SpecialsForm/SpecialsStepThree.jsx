import { useState } from 'react'
import { submitSpecialOrder } from '../../services/api'

export default function SpecialsStepThree({ form, back, onSubmit }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const rows = [
    { label: 'Name', value: form.customer_name },
    { label: 'Email', value: form.customer_email },
    { label: 'Phone', value: form.customer_phone || '—' },
    { label: 'Flavor', value: form.flavor },
    { label: 'Quantity', value: form.quantity },
    { label: 'Price', value: `$${form.quantity_price}` },
    { label: 'Instructions', value: form.special_instructions || '—' },
  ]

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      await submitSpecialOrder({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        flavor: form.flavor,
        quantity: form.quantity,
        quantity_price: form.quantity_price,
        special_instructions: form.special_instructions
      })
      onSubmit()
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={card}>
        <p style={sectionTitle}>ORDER SUMMARY</p>
        {rows.map(({ label, value }) => (
          <div key={label} style={row}>
            <span style={{ color: '#7A7070' }}>{label}</span>
            <span style={{ fontWeight: '500' }}>{value}</span>
          </div>
        ))}
        {error && <p style={{ color: 'red', marginTop: '1rem', fontSize: '13px' }}>{error}</p>}
      </div>
      <div style={actions}>
        <button className="btn-secondary" onClick={back} disabled={loading}>← Back</button>
        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Placing order...' : 'Place order →'}
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
const row = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
  borderBottom: '1px solid rgba(44,40,40,0.08)',
  fontSize: '14px'
}
const actions = { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '1rem' }
