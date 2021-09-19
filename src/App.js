import React, { useState } from "react";
import './App.css';
import { Button,Input,Table } from "reactstrap";
import {
  PlusOutlined, MinusOutlined
} from '@ant-design/icons';
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
    setItems(items => items.map((o,i) => i === index ? {...o, quantity, total:(quantity*o.price).toFixed(4)} : o))
  }  

  const handlePriceChange = (e, index) => {
    const price = e.target.value;
    setItems(items => items.map((o,i) => i === index ? {...o, price, total:(price*o.quantity).toFixed(4)} : o))
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

  const handleClear = () => {
    setItems([{index:0, quantity:0, price:0, total:0}]);
  }

  const handleDeleteItem = (e,index) => {
    setItems(items => items.filter((o,i) => i!== index))
  }

  const calculateTarget = () => {
    let up = parseFloat(revenue);
    up /= parseFloat(howMany);
    up += result;
    setTargetPrice(up)
  }

  return (
    <div  className='App'>
      <h1 style={{ marginBottom:'10px'}}> Unit Cost Calculator </h1>
      <div>
        <Table dark>
          <thead style={{color: 'red'}}>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => 
          <tr key= {index} >
            <td >
            <Input 
                style={{display:'flex'}}
                type='number'
                inputMode='numeric'
                autoComplete='one-time-code'
                value={item.price}
                onChange={(e) => handlePriceChange(e,index)}
              />
            </td>
          <td >
          <Input 
                style={{display:'flex'}}
                type='number'
                inputMode='decimal'
                autoComplete='one-time-code'
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e,index)}
              />
          </td>
          <td >
              {item.total}
          </td>
          <td>
            <Button style={{ marginRight:'5px', marginBottom:'5px'}} onClick={handleAddRow}>
              <PlusOutlined/>
            </Button>
            <Button onClick={(e) => handleDeleteItem(e,index)}>
              <MinusOutlined/>
            </Button>
          </td>
          </tr>
          )}
          </tbody>
        </Table>

      </div>
      
      <Button style={{ marginTop: '40px', marginBottom:'10px', backgroundColor:'blue', color:'white'}} onClick={handleCalculate}>
        Calculate Unit Cost
      </Button>

      <Button style={{ marginTop: '40px', marginBottom:'10px',  marginLeft:'10px', backgroundColor:'blue', color:'white'}} onClick={handleClear}>
        Clear
      </Button>
      <p style={{color:'green', marginTop:'20px'}}> Take a screenshot or save the results, they won't appear after you close this window.</p>
      {result !== 0.0 ? <div>       
        <p style={{color:'green', marginTop:'20px'}}>Quantity: {howMany} </p>
        <p style={{color:'green', marginTop:'20px',marginBottom:'40px'}}>Unit Cost: {result}</p>
      </div>
       
      : <p style= {{color:'green', marginTop:'20px', marginBottom:'40px'}}>Add some items</p>}  
      <label>How many revenue do you want?</label>
      <Input
        style={{ marginLeft:'25px', maxWidth:'400', display:'flex' }}  
        type='number'
        autoComplete='one-time-code'
        value={revenue}
        onChange={handleRevenueChange}
      />
    <div>
    <Button style={{marginTop: '40px', marginBottom:'40px', backgroundColor:'blue', color:'white'}} onClick={calculateTarget}>
      Calculate Target Price
    </Button>
    </div>
  {targetPrice !== 0.0 ? <p style={{color:'green', marginBottom:'40px'}}>You should sell all of them to {targetPrice} to obtain this revenue</p> 
  : <p style= {{color:'green', marginBottom:'40px'}}>First calculate unit cost</p>}
  </div>  
  );

}

