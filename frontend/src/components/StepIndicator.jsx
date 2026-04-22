const steps = ['Your info', 'Cake details', 'Custom touches', 'Review']

export default function StepIndicator({ current }) {
  return (
    <div style={{
      display: 'flex',
      marginBottom: '2rem',
      border: '1px solid rgba(58,53,53,0.15)',
      borderRadius: '10px',
      overflow: 'hidden'
    }}>
      {steps.map((label, i) => {
        const n = i + 1
        const isActive = n === current
        const isDone = n < current
        return (
          <div key={n} style={{
            flex: 1,
            padding: '10px 4px',
            textAlign: 'center',
            fontSize: '12px',
            fontFamily: 'Raleway, sans-serif',
            borderRight: i < steps.length - 1 ? '1px solid rgba(58,53,53,0.15)' : 'none',
            background: isActive ? '#FBEAF0' : isDone ? '#f5f5f3' : 'white',
            color: isActive ? '#993556' : '#7A7070',
            fontWeight: isActive ? '600' : '400'
          }}>
            <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '2px' }}>{n}</div>
            {label}
          </div>
        )
      })}
    </div>
  )
}
