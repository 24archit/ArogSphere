import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import "../../assets/styles/LoadingSkeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className="loading-container">
      <h2 className="loading-title">Fetching Best Prices...</h2>

      {/* Section 1: Best Deals (Top 4 Products) */}
      <Box className="skeleton-section">
        <div className="skeleton-grid">
          {[...Array(4)].map((_, index) => (
            <div className="skeleton-card" key={index}>
              <Skeleton variant="rectangular" className="skeleton-image" />
              <Skeleton variant="text" className="skeleton-text" />
              <Skeleton variant="text" className="skeleton-text small" />
              <Skeleton variant="rectangular" className="skeleton-button" />
            </div>
          ))}
        </div>
      </Box>

      {/* Sections 2-4: Other Products from Websites */}
      {[...Array(1)].map((_, sectionIndex) => (
        <Box key={sectionIndex} className="skeleton-section">
          <div className="skeleton-grid">
            {[...Array(20)].map((_, productIndex) => (
              <div className="skeleton-card" key={productIndex}>
                <Skeleton variant="rectangular" className="skeleton-image" />
                <Skeleton variant="text" className="skeleton-text" />
                <Skeleton variant="text" className="skeleton-text small" />
                <Skeleton variant="rectangular" className="skeleton-button" />
              </div>
            ))}
          </div>
        </Box>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
