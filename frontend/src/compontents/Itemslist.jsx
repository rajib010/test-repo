import React, { memo } from "react";

function Itemslist({ productList, selectedProducts, setSelectedProducts }) {
  const toggleSelect = (item) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [item.name]: !prev[item.name],
    }));
  };

  return (
    <table>
      <thead>
        <tr>
          <td>SN</td>
          <td>Name</td>
          <td>Price</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {/* show all the available products in a row */}
        {productList &&
          productList.map((prod, index) => (
            <tr key={index}>
              <td>{++index}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!selectedProducts[prod.name]}
                  onChange={() => toggleSelect(prod)}
                />{" "}
                Add item
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default memo(Itemslist);
