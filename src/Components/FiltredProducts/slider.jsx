import React, { useState } from 'react';

const ProductList = ({ products }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);


  const handleSliderChange = (event) => {
    const value = event.target.value;
    setPriceRange([0, value]); 
  };


  const filteredProducts = products.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div>
      <h2>Product List</h2>

      
      <div>
        <label htmlFor="priceRange">Sort by Price: </label>
        <input
          type="range"
          id="priceRange"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={handleSliderChange}
        />
        <span>Up to ${priceRange[1]}</span>
      </div>

    
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;


const products = [
    { id: 1, name: 'Product 1', price: 200 },
    { id: 2, name: 'Product 2', price: 500 },
    { id: 3, name: 'Product 3', price: 800 },
    { id: 4, name: 'Product 4', price: 300 },
    { id: 5, name: 'Product 5', price: 700 },
  ];
  
  function App() {
    return <ProductList products={products} />;
  }
  
  export default App;
  