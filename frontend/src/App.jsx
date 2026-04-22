import { useState } from 'react'
import Header from './components/Header'
import StepIndicator from './components/StepIndicator'
import StepOne from './components/OrderForm/StepOne'
import StepTwo from './components/OrderForm/StepTwo'
import StepThree from './components/OrderForm/StepThree'
import StepFour from './components/OrderForm/StepFour'
import Confirmation from './components/OrderForm/Confirmation'

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

export default function App() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const update = (fields) => setForm(prev => ({ ...prev, ...fields }))
  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 1rem 4rem'
  }

  if (submitted) return (
    <div style={containerStyle}>
      <Header />
      <Confirmation name={form.customer_name} />
    </div>
  )

  return (
    <div style={containerStyle}>
      <Header />
      <StepIndicator current={step} />
      {step === 1 && <StepOne form={form} update={update} next={next} />}
      {step === 2 && <StepTwo form={form} update={update} next={next} back={back} />}
      {step === 3 && <StepThree form={form} update={update} next={next} back={back} />}
      {step === 4 && <StepFour form={form} back={back} onSubmit={() => setSubmitted(true)} />}
    </div>
  )
}
