import { useState } from 'react'
import SpecialsStepOne from './SpecialsForm/SpecialsStepOne'
import SpecialsStepTwo from './SpecialsForm/SpecialsStepTwo'
import SpecialsStepThree from './SpecialsForm/SpecialsStepThree'
import SpecialsConfirmation from './SpecialsForm/SpecialsConfirmation'

const INITIAL_FORM = {
  customer_name: '',
  customer_email: '',
  customer_phone: '',
  flavor: '',
  quantity: '',
  quantity_price: 0,
  special_instructions: ''
}

const steps = ["Your info", "Your order", "Review"]

export default function SpecialsModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const update = (fields) => setForm(prev => ({ ...prev, ...fields }))
  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  return (
    <div style={backdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modal}>
        <button onClick={onClose} style={closeBtn}>✕</button>

        <div style={modalHeader}>
          <img src="/assets/logo.png" alt="Nela's Bakery" style={{ height: '44px', width: 'auto' }} />
          <p style={{ fontSize: '13px', color: '#D4537E', fontWeight: '500', letterSpacing: '0.08em', margin: '8px 0 0' }}>
            MOTHER'S DAY MINIS — ORDER BY MAY 8TH
          </p>
        </div>

        <div style={modalBody}>
          {submitted ? (
            <SpecialsConfirmation form={form} />
          ) : (
            <>
              {/* Step indicator */}
              <div style={stepWrap}>
                {steps.map((label, i) => {
                  const n = i + 1
                  const isActive = n === step
                  const isDone = n < step
                  return (
                    <div key={n} style={{
                      ...stepItem,
                      background: isActive ? '#FBEAF0' : isDone ? '#f5f5f3' : 'white',
                      color: isActive ? '#993556' : '#7A7070',
                      fontWeight: isActive ? '600' : '400',
                      borderRight: i < steps.length - 1 ? '1px solid rgba(44,40,40,0.12)' : 'none'
                    }}>
                      <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '2px' }}>{n}</div>
                      {label}
                    </div>
                  )
                })}
              </div>

              {step === 1 && <SpecialsStepOne form={form} update={update} next={next} />}
              {step === 2 && <SpecialsStepTwo form={form} update={update} next={next} back={back} />}
              {step === 3 && <SpecialsStepThree form={form} back={back} onSubmit={() => setSubmitted(true)} />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const backdrop = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(44,40,40,0.6)',
  backdropFilter: 'blur(4px)',
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
}

const modal = {
  background: '#FAF6F1',
  borderRadius: '20px',
  width: '100%',
  maxWidth: '580px',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  boxShadow: '0 24px 80px rgba(44,40,40,0.25)',
}

const closeBtn = {
  position: 'absolute',
  top: '1.25rem',
  right: '1.25rem',
  background: 'none',
  border: 'none',
  fontSize: '18px',
  color: '#7A7070',
  cursor: 'pointer',
  zIndex: 10,
  lineHeight: 1,
}

const modalHeader = {
  padding: '1.75rem 2rem 1rem',
  borderBottom: '1px solid rgba(44,40,40,0.08)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const modalBody = {
  padding: '1.5rem 2rem 2rem',
}

const stepWrap = {
  display: 'flex',
  marginBottom: '1.5rem',
  border: '1px solid rgba(44,40,40,0.12)',
  borderRadius: '10px',
  overflow: 'hidden',
}

const stepItem = {
  flex: 1,
  padding: '10px 4px',
  textAlign: 'center',
  fontSize: '12px',
  fontFamily: 'Raleway, sans-serif',
  transition: 'background 0.15s',
}
