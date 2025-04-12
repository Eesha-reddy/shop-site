
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// function ProductDetail() {
//   const { id } = useParams(); // get product id from URL
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://fakestoreapi.com/products/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         setProduct(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching product:', error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;

//   if (!product) return <p style={{ textAlign: 'center' }}>Product not found</p>;

//   return (
//     <div style={{ padding: '2rem', textAlign: 'center' }}>
//       <img
//         src={product.image}
//         alt={product.title}
//         style={{ maxWidth: '200px', marginBottom: '1rem' }}
//       />
//       <h2>{product.title}</h2>
//       <p style={{ maxWidth: '600px', margin: '1rem auto' }}>{product.description}</p>
//       <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price}</p>
//     </div>
//   );
// }

// export default ProductDetail;

// pages/ProductDetail.jsx
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import './ProductDetail.css';




// function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://fakestoreapi.com/products/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         setProduct(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching product:', error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p className="center">Loading...</p>;
//   if (!product) return <p className="center">Product not found</p>;

//   return (
//     <div className="product-detail-container">
//       <div className="product-detail-card">
//         <img src={product.image} alt={product.title} className="product-detail-image" />
//         <div className="product-detail-info">
//           <h2>{product.title}</h2>
//           <p className="product-detail-description">{product.description}</p>
//           <p className="product-detail-price">${product.price}</p>
//           <button className="add-to-cart-btn">Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;


import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './ProductDetail.css'

function ProductDetail({ onAddToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching product:', error)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product)
      alert("Item added to cart!")
    }
  }

  if (loading) return <p className="center">Loading...</p>
  if (!product) return <p className="center">Product not found</p>

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img src={product.image} alt={product.title} className="product-detail-image" />
        <div className="product-detail-info">
          <h2>{product.title}</h2>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">${product.price}</p>
          
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button className="go-to-cart-btn" onClick={() => navigate('/cart')}>
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
