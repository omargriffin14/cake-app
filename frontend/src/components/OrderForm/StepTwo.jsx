const DROPDOWNS = [
  {
    label: 'Flavor', field: 'cake_flavor', otherField: 'cake_flavor_other',
    options: ['Vanilla', 'Chocolate', 'Red velvet', 'Marble', 'Carrot']
  },
  {
    label: 'Shape', field: 'shape', otherField: 'shape_other',
    options: ['Round', 'Sheet', 'Heart']
  },
  {
    label: 'Height', field: 'height', otherField: 'height_other',
    options: ['2 layers', '3 layers', '4 layers']
  },
  {
    label: 'Size', field: 'size', otherField: 'size_other',
    options: ['4 inch', '6 inch', '8 inch', '10 inch']
  },
  {
    label: 'Border style', field: 'border', otherField: 'border_other',
    options: ['Shell border', 'Flowers', 'Plain'], fullWidth: true
  }
]

export default function StepTwo({ form, update, next, back }) {
  const valid = form.cake_flavor && form.shape && form.height && form.size && form.border

  return (
    <div>
      <div style={card}>
        <p style={sectionTitle}>CAKE DETAILS</p>
        <div style={grid2}>
          {DROPDOWNS.map(({ label, field, otherField, options, fullWidth }) => (
            <div key={field} className="field" style={fullWidth ? { gridColumn: '1 / -1' } : {}}>
              <label>{label}</label>
              <select
                value={form[field]}
                onChange={e => update({ [field]: e.target.value })}
              >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map(o => <option key={o}>{o}</option>)}
                <option value="other">Other</option>
              </select>
              {form[field] === 'other' && (
                <input
                  className="field-other"
                  value={form[otherField]}
                  onChange={e => update({ [otherField]: e.target.value })}
                  placeholder={`Describe your ${label.toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={actions}>
        <button className="btn-secondary" onClick={back}>← Back</button>
        <button className="btn-primary" onClick={next} disabled={!valid}>Next →</button>
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
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }
const actions = { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '1rem' }
