import React from "react";
import "../../assets/styles/SearchResults.css";
import Heading from "./Heading";

const SearchResults = ({ results }) => {
  // Extract top products from each website and sort by price
  const topProducts = results
    .map((site) => site.products[0])
    .sort((a, b) => a.price - b.price);

  return (
    <div className="search-results">
      <Heading text="Find Medicines at the Cheapest Prices Across the Internet !" />

      {/* Section 1: Top Products (Sorted by Price) */}
      <div className="site-section">
        <h3 className="section-title">💰 Best Deals (Lowest Prices First)</h3>
        <div className="product-grid">
          {topProducts.map((product, idx) => (
            <div key={idx} className={`product-card ${idx === 0 ? "highlighted" : ""}`}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">{product.price}</p>
                <a href={product.link} className="buy-button" target="_blank" rel="noopener noreferrer">
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2-5: Other Products from Each Website */}
      {results.map((site, index) => (
        <div key={index} className="site-section">
          <h3 className="section-title">{site.website} - Other Products</h3>
          <div className="product-grid">
            {site.products.slice(1).map((product, idx) => (
              <div key={idx} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">{product.price}</p>
                  <a href={product.link} className="buy-button" target="_blank" rel="noopener noreferrer">
                    View Product
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

// if products is empty 
// if mage or any off the sub keus is empty or null 