import { useState } from 'react'
import { submitOrder } from '../../services/api'

export default function StepFour({ form, back, onSubmit }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const display = (field, other) => form[field] === 'other' ? form[other] : form[field]

  const rows = [
    { label: 'Name', value: form.customer_name },
    { label: 'Email', value: form.customer_email },
    { label: 'Phone', value: form.customer_phone || '—' },
    { label: 'Flavor', value: display('cake_flavor', 'cake_flavor_other') },
    { label: 'Shape', value: display('shape', 'shape_other') },
    { label: 'Height', value: display('height', 'height_other') },
    { label: 'Size', value: display('size', 'size_other') },
    { label: 'Border', value: display('border', 'border_other') },
    { label: 'Notes', value: form.custom_notes || '—' },
    { label: 'Image', value: form.image ? form.image.name : 'None' }
  ]

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = new FormData()
      Object.entries(form).forEach(([key, val]) => {
        if (key === 'image' && val) data.append('image', val)
        else if (key !== 'image') data.append(key, val || '')
      })
      await submitOrder(data)
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
  border: '1px solid rgba(58,53,53,0.12)',
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
  borderBottom: '1px solid rgba(58,53,53,0.08)',
  fontSize: '14px'
}
const actions = { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '1rem' }
