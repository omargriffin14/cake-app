export default function StepThree({ form, update, next, back }) {
  return (
    <div>
      <div style={card}>
        <p style={sectionTitle}>CUSTOM TOUCHES</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="field">
            <label>Notes & inspiration</label>
            <textarea
              value={form.custom_notes}
              onChange={e => update({ custom_notes: e.target.value })}
              placeholder="Tell us about colors, themes, text on the cake, or any special requests..."
              rows={4}
            />
          </div>
          <div className="field">
            <label>Inspiration image (optional)</label>
            <div style={uploadBox} onClick={() => document.getElementById('img-upload').click()}>
              <p style={{ fontSize: '13px', color: '#7A7070' }}>
                {form.image ? `✓ ${form.image.name}` : '📎 Click to upload an image'}
              </p>
              <span style={{ fontSize: '11px', color: '#999' }}>JPEG, PNG or WebP · max 5MB</span>
              <input
                id="img-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{ display: 'none' }}
                onChange={e => update({ image: e.target.files[0] || null })}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={actions}>
        <button className="btn-secondary" onClick={back}>← Back</button>
        <button className="btn-primary" onClick={next}>Review order →</button>
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
const uploadBox = {
  border: '1px dashed rgba(58,53,53,0.3)',
  borderRadius: '8px',
  padding: '1.5rem',
  textAlign: 'center',
  cursor: 'pointer',
  background: '#faf9f7'
}
const actions = { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '1rem' }
