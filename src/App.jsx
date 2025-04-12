
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Header from './pages/Header'
import './App.css'
import { useState } from 'react'

function App() {
  const [cartItems, setCartItems] = useState([])

  const handleAddToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id)
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    alert('Order placed successfully!')
    setCartItems([])
  }

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }
  
  return (
    <div className="app-container">
      {/* Don't show Header on login page */}
      {window.location.pathname !== '/' && <Header cartCount={cartItems.length} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onRemove={handleRemoveFromCart}
              onCheckout={handleCheckout}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
