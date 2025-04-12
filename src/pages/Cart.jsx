



// import './Cart.css' // optional styling
// import { useEffect, useState } from 'react'

// function Cart({ cartItems, onRemove, onCheckout }) {
//   const [showPopup, setShowPopup] = useState(false)

//   const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

//   const handleCheckoutClick = () => {
//     onCheckout()
//     setShowPopup(true)
//     setTimeout(() => {
//       setShowPopup(false)
//     }, 4000)
//   }

//   return (
//     <div className="cart-container">
//       <h2>Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul className="cart-items">
//             {cartItems.map(item => (
//               <li key={item.id} className="cart-item">
//                 <img src={item.image} alt={item.title} className="cart-img" />
//                 <div>
//                   <h3>{item.title}</h3>
//                   <p>Price: ${item.price}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <button onClick={() => onRemove(item.id)}>Remove</button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <h3>Total: ${totalPrice.toFixed(2)}</h3>
//           <button className="checkout-btn" onClick={handleCheckoutClick}>
//             Checkout
//           </button>
//         </>
//       )}

//       {showPopup && (
//         <div className="checkout-popup">
//           Order placed successfully!
//         </div>
//       )}
//     </div>
//   )
// }

// export default Cart




import './Cart.css'

function Cart({ cartItems, onRemove, onCheckout, onUpdateQuantity }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} className="cart-img" />
              <div className="cart-details">
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
