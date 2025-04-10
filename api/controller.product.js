import { productsInfo } from "./data.js";
import { calculateCourierCharges } from "./utils.js";

const getAllProducts = async function (req, res) {
    console.log("get route hit")
    try {
        const products = productsInfo;
        // return data with success status code 
        return res.status(200).json({ success: true, products })
    } catch (error) {
        console.log("Error in getting products", error);

        //return error message and status in case of failure
        return res.status(500).json({
            success: false,
            message: "Error in getting products"
        })
    }
}

const placeOrder = function (req, res) {
    const MAX_PRICE_PER_PACKAGE = 250;
    const orderData = req.body; //get data from frontend

    console.log("Received order data:", req.body);

  
    //check valid data type
    if (!Array.isArray(orderData)) {
      return res.status(400).json({ success: false, message: "Invalid data format" });
    }
  
    const sortedOrder = [...orderData].sort((a, b) => b.price - a.price); //sort in descending order
  
    const packagesArray = [];
  
    for (let order of sortedOrder) {
      let isPlaced = false;
  
      //put in available package if price is min
      for (const pkg of packagesArray) {
        const totalPrice = pkg.items.reduce((sum, i) => sum + i.price, 0);
        if (totalPrice + order.price <= MAX_PRICE_PER_PACKAGE) {
          pkg.items.push(order);
          isPlaced = true;
          break;
        }
      }
  
      //place in new package
      if (!isPlaced) {
        packagesArray.push({ items: [order] });
      }
    }
  
    //create result in requested format
    const result = packagesArray.map((pkg, index) => {
      const totalWeight = pkg.items.reduce((sum, i) => sum + i.weight, 0);
      const totalPrice = pkg.items.reduce((sum, i) => sum + i.price, 0);
      const courierPrice = calculateCourierCharges(totalWeight);
  
      return {
        name: `Package ${index + 1}`,
        items: pkg.items.map(i => i.name),
        totalWeight,
        totalPrice,
        courierPrice,
      };
    });
//   return result
    return res.status(200).json({ success: true, packagesArray: result });
  };
  


export { getAllProducts, placeOrder }