// import React, { useState } from 'react';
import './StatisticsCard.css'; // Import the CSS file

const StatisticsCard = (props) => {
    const {totalSalesAmount,totalUnsold,totalSold} = props
    

  return (
    <div className="container">
      <h2 className="title">
        {/* Statistics- December */}
        <span className="dropdownText">(Selected month name from dropdown)</span>
      </h2>

      <div className="card">
        <div className="statRow">
          <span>Total sale</span>
          <span>{totalSalesAmount}</span>
        </div>
        <div className="statRow">
          <span>Total sold item</span>
          <span>{totalSold}</span>
        </div>
        <div className="statRow">
          <span>Total not sold item</span>
          <span>{totalUnsold}</span>
        </div>
      </div>

      
    </div>
  );
};

export default StatisticsCard;
