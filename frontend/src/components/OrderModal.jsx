import { useState } from 'react'
import StepIndicator from './StepIndicator'
import StepOne from './OrderForm/StepOne'
import StepTwo from './OrderForm/StepTwo'
import StepThree from './OrderForm/StepThree'
import StepFour from './OrderForm/StepFour'
import Confirmation from './OrderForm/Confirmation'

const INITIAL_FORM = {
  customer_name: '',
  customer_email: '',
  customer_phone: '',
  cake_flavor: '',
  cake_flavor_other: '',
  shape: '',
  shape_other: '',
  height: '',
  height_other: '',
  size: '',
  size_other: '',
  border: '',
  border_other: '',
  custom_notes: '',
  image: null
}

export default function OrderModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const update = (fields) => setForm(prev => ({ ...prev, ...fields }))
  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  return (
    <div style={backdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modal}>

        {/* Close button */}
        <button onClick={onClose} style={closeBtn}>✕</button>

        {/* Modal header */}
        <div style={modalHeader}>
          <img src="/assets/logo.png" alt="Nela's Bakery" style={{ height: '88px', width: 'auto' }} />
        </div>

        <div style={modalBody}>
          {submitted ? (
            <Confirmation name={form.customer_name} />
          ) : (
            <>
              <StepIndicator current={step} />
              {step === 1 && <StepOne form={form} update={update} next={next} />}
              {step === 2 && <StepTwo form={form} update={update} next={next} back={back} />}
              {step === 3 && <StepThree form={form} update={update} next={next} back={back} />}
              {step === 4 && <StepFour form={form} back={back} onSubmit={() => setSubmitted(true)} />}
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
  justifyContent: 'center',
}

const modalBody = {
  padding: '1.5rem 2rem 2rem',
}
