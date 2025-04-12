// // ProductList.jsx
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import './ProductList.css';

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/products')
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, []);

//   const handleProductClick = (id) => {
//     navigate(`/product/${id}`); // 👈 navigate to product detail
//   };

//   return (
//     <div className="product-list">
//       {products.map(product => (
//         <div
//           className="product-card"
//           key={product.id}
//           onClick={() => handleProductClick(product.id)} // 👈 click handler
//         >
//           <img src={product.image} alt={product.title} />
//           <h3>{product.title}</h3>
//           <p>${product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default ProductList;


import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductList.css'

function ProductList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  // Fetch categories
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err))
  }, [])

  // Fetch products based on selected category
  useEffect(() => {
    setLoading(true)
    const url =
      selectedCategory === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${selectedCategory}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching products:', err)
        setLoading(false)
      })
  }, [selectedCategory])

  return (
    <div className="product-list-container">
      <h2>Products</h2>

      {/* Category Filter */}
      <div className="category-filter">
        <button
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
