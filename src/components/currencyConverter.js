import React, { useState, useEffect } from 'react';
import { getExchangeRates } from '../api/currencyapi';
import './currencyConverter.css';

const CurrencyConverter = () => {

  //The Variables
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PHP');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] =useState(null);
  const [isConverted, setIsConverted] = useState(false);

  useEffect(() =>{
    const fetchExchangeRates = async () => {

      try{
        const currencyData = await getExchangeRates();
        setCurrencies(Object.keys(currencyData));
        setExchangeRate(currencyData[toCurrency].value / currencyData[fromCurrency].value);
      }
      catch(error){
        console.error("Failed to get the currency data!",error);
      }

    };


  fetchExchangeRates();

  }, [fromCurrency, toCurrency]);

  const handleOverClick = () => {

      setConvertedAmount (amount * exchangeRate);
      setIsConverted(true);


  };


  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return ( 
    <>
    <div className='container'>

      <div className='card'>

          <h2 className="title">Currency Converter</h2> 
          
          <input
            type='number'
            value={amount}
            onChange={handleAmountChange}
            placeholder='Enter Amount'
            className='input-amount'
          />

          <div className='select-currency'>

          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className='from'>
            {currencies.map((currency, index) => (
              <option key={index} value={currency}>{currency}</option>
            ))}
          </select>

          <h3 className='too'>to</h3>


          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className='to'>
            {currencies.map((currency,index) =>(
              <option key={index} value={currency}>{currency}</option>
            ))}
          </select>

          </div>
        
          <button className='button-amount' onClick={handleOverClick}>Convert</button>
          
          {isConverted && (
            <div className='converted-amount'>
              <h3>Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}</h3>
            </div>
          )}
      </div>

    </div>
    </>
  );
};

export default CurrencyConverter;
