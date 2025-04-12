import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header({ cartCount }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/products" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link">
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <button className="nav-link logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Header
