import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
function App() {
  const[amount,setAmount]=useState(1)
  const[fromcurrency,setFromcurrency]=useState("USD")
  const[tocurrency,setTocurrency]=useState("INR")
  const[convertedCurrency,setconvertedcurrency]=useState(null)
  const[exchangeRate,setExchangeRate]=useState(null)

  useEffect(()=>{
    const getExchangedata=async ()=>{
      try{
        var url=`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`
        var res=await axios.get(url)
        setExchangeRate(res.data.rates[tocurrency])
      }catch(error){
        console.error("error fitching exchange rate:");
      }
    }
    getExchangedata();
  },[fromcurrency, tocurrency])

  useEffect(()=>{
    if(exchangeRate !== null){
      setconvertedcurrency((amount*exchangeRate).toFixed(2))
    }
  },[amount,exchangeRate])

  const handleAmount=(e)=>{
    var value=parseFloat(e.target.value)
    setAmount(value)
  }
  const handleFromcurrency=(e)=>{
    setFromcurrency(e.target.value)
  }
  const handlTocurrency=(e)=>{
    setTocurrency(e.target.value)
  }
  return (
    <>
      <div className="currency-container">
        <div className='box'></div>
          <div className="data">
            <h1>Currency Converter</h1>
            <div className="input-container">
              <label htmlFor="amount">Amount:</label>
              <input type="number" id='amount' value={amount} onChange={handleAmount}/>
            </div>
            <div className="input-container">
              <label htmlFor="fromcurrency">From Currency:</label>
              <select id="fromcurrency" value={fromcurrency} onChange={handleFromcurrency} >
                <option value="USD">USD - United State Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="AED">AED - UAE Dirham</option>
                <option value="ARS">ARS - Argentine Peso</option>
                <option value="AOA">AOA - Kwanza </option>
                <option value="AFN">AFN - Afghani</option>
                <option value="ALL">ALL - Lek </option>
                <option value="AMD">AMD - Armeniam Dram</option>
                <option value="ANG">ANG - Netherlands Antillian Guilder</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="tocurrency">To Currency:</label>
              <select  id="tocurrency" value={tocurrency} onChange={handlTocurrency} >
                <option value="USD">USD - United State Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="AED">AED - UAE Dirham</option>
                <option value="ARS">ARS - Argentine Peso</option>
                <option value="AOA">AOA - Kwanza </option>
                <option value="AFN">AFN - Afghani</option>
                <option value="ALL">ALL - Lek </option>
                <option value="AMD">AMD - Armeniam Dram</option>
                <option value="ANG ">ANG - Netherlands Antillian Guilder</option>
              </select>
            </div>
          </div>
          <div className="result">
          <p>{amount} {fromcurrency} is equal to <b>{convertedCurrency}</b> {tocurrency}</p>
          </div>
      </div>
    </>
  )
}

export default App
