export default function Header() {
  return (
    <header style={{
      textAlign: 'center',
      padding: '2.5rem 0 2rem',
      marginBottom: '1.5rem',
      borderBottom: '1px solid rgba(58,53,53,0.1)'
    }}>
      <img
        src="https://raw.githubusercontent.com/omargriffin14/cake-app/main/frontend/public/assets/logo.png"
        alt="Nela's Bakery"
        style={{ width: '200px', height: 'auto' }}
      />
    </header>
  )
}
