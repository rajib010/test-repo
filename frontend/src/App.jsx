import React, { useCallback, useEffect, useState } from "react";
import Itemslist from "./compontents/Itemslist";
import OrderDetails from "./compontents/OrderDetails";

function App() {
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [result, setResult] = useState(null);

  // fetch all products from the sever
  const getProducts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products"); //api route
      if (!response.ok) throw new Error("Error in getting products list");
      const data = await response.json();
      setProductList(data.products); // set the data fetched into productList variable
    } catch (error) {
      console.log("Error in getting products", error?.message);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // console.log(productList);

  // function to place order sending selected data into backend

  const placeOrder = async () => {
    const selectedItems = productList.filter(
      (item) => selectedProducts[item.name]
    );

    try {
      const res = await fetch(
        "http://localhost:3000/api/products/place-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedItems),
        }
      );
      if (!res.ok) throw new Error("Error in placing order");
      const data = await res.json();

      setResult(data.packagesArray); //store the packages information
    } catch (error) {
      console.log("Error in placing order", error?.message);
    }
  };

  return (
    <>
      <Itemslist
        productList={productList}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <button
        onClick={placeOrder}
        disabled={!Object.values(selectedProducts).includes(true)}
      >
        Place Order
      </button>

      {result && <OrderDetails result={result} />}
    </>
  );
}

export default App;
