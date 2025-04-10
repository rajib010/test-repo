import React, { memo } from "react";

function OrderDetails({ result }) {
  return (
    <div className="container">
      <h2>List of packages</h2>
      {result &&
        result.map((pkg, idx) => (
          <div key={idx}>
            <h3>{pkg.name}</h3>
            {/* convert array into string */}
            <p>Items: {pkg.items.join(", ")}</p> 
            <p>Total weight: {pkg.totalWeight}</p>
            <p>Total price: {pkg.totalPrice}</p>
            <p>Courier charge: {pkg.courierPrice}</p>
          </div>
        ))}
    </div>
  );
}

export default memo(OrderDetails);
