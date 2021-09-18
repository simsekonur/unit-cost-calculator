import React, { useState } from "react";
import './App.css';
export default function App(){

  const [items, setItems] = useState([{index:0, quantity:0, price:0, total:0}])

  const [result, setResult] = useState(0);
  const [howMany, setHowMany] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);

  const handleAddRow = () => {
    setItems([...items, { quantity:0, price:0, total:0}]);
  }

  const handleQuantityChange = (e, index) => {
    const quantity = e.target.value;
    setItems(items => items.map((o,i) => i === index ? {...o, quantity, total: quantity*o.price} : o))

  }  

  const handlePriceChange = (e, index) => {
    const price = e.target.value;
    setItems(items => items.map((o,i) => i === index ? {...o, price, total:price*o.quantity} : o))

  }

  const handleRevenueChange = (e) => {
    setRevenue(e.target.value);
  }

  const handleCalculate = () => {
    let totalQuantity = 0.0;
    items.forEach(item => {
      totalQuantity += parseFloat(item.quantity);
    });
    let totalValue =0.0;
    items.forEach((item) => {
      const tmp1= parseFloat(item.quantity);
      const tmp2 = parseFloat(item.price);
      totalValue += tmp1*tmp2;
    })
    const result = parseFloat(parseFloat(totalValue) / parseFloat(totalQuantity));

    setResult(result);
    setHowMany(totalQuantity);
    
  }

  const calculateTarget = () => {
    let up = parseFloat(revenue);
    up /= parseFloat(howMany);
    up += result;
    setTargetPrice(up)
  }

  const tableHeader = 
  <tr>
    <th>Index</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Total</th>
    <th>Add</th>
  </tr>

  return (
    <div  className='App'>
      <h1 style={{ color:'red'}}> Unit Cost Calculator </h1>
      <div>
        <table >
          <thead style={{color: 'red'}}>
            {tableHeader}
          </thead>
          <tbody>
          {items.map((item, index) => 
          <tr key= {index} >
            <td style={{paddingRight:'25px'}}>
              {index +1}
            </td>
            <td style={{paddingRight:'25px'}}>
            <input 
                style={{display:'flex'}}
                type='number'
                value={item.price}
                onChange={(e) => handlePriceChange(e,index)}
              />
            </td>
          <td style={{paddingRight:'25px'}}>
          <input 
                style={{display:'flex'}}
                type='number'
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e,index)}
              />
          </td>
          <td style={{paddingRight:'25px'}}>
              {item.total}
          </td>
          <td style={{paddingRight:'35px'}}>
            <button style={{backgroundColor:'blue', color:'white'}} onClick={handleAddRow}>
              Add 
            </button>
          </td>
          </tr>
          )}
          </tbody>
        </table>

      </div>
      <button style={{ marginTop: '40px', marginBottom:'10px', backgroundColor:'blue', color:'white'}} onClick={handleCalculate}>
        Calculate Unit Cost
      </button>
    
      {result !== 0.0 ? <div><p style={{color:'green', marginTop:'20px'}}>Quantity: {howMany} </p>
      <p style={{color:'green', marginTop:'20px',marginBottom:'40px'}}>Unit Cost: {result}</p>
      </div>
       
      : <p style= {{color:'green', marginBottom:'40px'}}>Add some items</p>}  
      <div> 
      <label>How many revenue do you want?</label>
      <input
        style={{marginLeft:'25px'}}  
        type='number'
        value={revenue}
        onChange={handleRevenueChange}
      />
        <div>
        <button style={{marginTop: '40px', marginBottom:'40px', backgroundColor:'blue', color:'white'}} onClick={calculateTarget}>
          Calculate Target Price
        </button>
        </div>
      {targetPrice !== 0.0 ? <p style={{color:'green', marginBottom:'40px'}}>You should sell all of them to {targetPrice} to obtain this revenue</p> 
      : <p style= {{color:'green', marginBottom:'40px'}}>First calculate unit cost</p>}
      </div>  
    </div>
  );

}

