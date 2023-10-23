//https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_LgKfbt88yhPF4tM5PunGihSkl29IFFiKs3JOlChP

import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import axios from 'axios';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [currencies, setCurrencies] = useState([]);
    const [conversionRate, setConversionRate] = useState(null);
    const [darkThemes, setDarkThemes] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'dark';
    });

    useEffect(() => {
        axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_LgKfbt88yhPF4tM5PunGihSkl29IFFiKs3JOlChP&base=${fromCurrency}`).then((res) => {
            console.log(res.data.data)
            const rate = res.data.data;
            const availableCurrencies = Object.keys(rate);
            setCurrencies(availableCurrencies);
            setConversionRate(rate[toCurrency] / rate[fromCurrency] * amount);
        })
            .catch((error) => {
                console.log(error);
            });
    }, [amount, fromCurrency, toCurrency])



    useEffect(() => {
        localStorage.setItem('theme', darkThemes ? 'dark' : 'light');
    }, [darkThemes]);


    const toggleTheme = () => {
        setDarkThemes((prevTheme) => !prevTheme);
    };

    const currencyIcons = {
        AUD: '$',
        BGN: 'лв',
        BRL: 'R$',
        CAD: '$',
        CHF: 'Fr',
        CNY: '¥',
        CZK: 'Kč',
        DKK: 'kr',
        EUR: '€',
        GBP: '£',
        HKD: 'HK$',
        HRK: 'kn',
        HUF: 'Ft',
        IDR: 'Rp',
        ILS: '₪',
        INR: '₹',
        ISK: 'kr',
        JPY: '¥',
        KRW: '₩',
        MXN: '$',
        MYR: 'RM',
        NOK: 'kr',
        NZD: '$',
        PHP: '₱',
        PLN: 'zł',
        RON: 'lei',
        RUB: '₽',
        SEK: 'kr',
        SGD: '$',
        THB: '฿',
        TRY: '₺',
        USD: '$',
        ZAR: 'R',
      }


    return (
        <ThemeProvider theme={darkThemes ? darkTheme : lightTheme}>
            <GlobalStyle />
            <button onClick={toggleTheme} style={{cursor: "pointer"}}>Toggle Theme</button>
            <FormContainer>
                <h2>Currency Converter</h2>
                <div>
                    <input type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} />
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                               {currencyIcons[currency]} {currency}
                            </option>
                        ))}
                    </select>
                    <p>to</p>
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                               {currencyIcons[currency]} {currency}
                            </option>
                        ))}
                    </select>
                    {conversionRate !== null && <p>{amount} {fromCurrency} is approximately {conversionRate.toFixed(2)} {toCurrency}</p>}
                </div>
            </FormContainer>
        </ ThemeProvider>


    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  
  h2 {
    color: ${(props) => props.theme.text};
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: ${(props) => props.theme.text};
      width: 85%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    select {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: ${(props) => props.theme.text};
      width: 100%;
      font-size: 1rem;
      position: relative;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }

      option {
        background-color: ${(props) => props.theme.background};
        color: ${(props) => props.theme.text};
        padding: 4px 0px 4px 10px;
      }
      
    }

    p {
        color: ${(props) => props.theme.text};
    }

    select, p {
      background-color: transparent;
    }

    p:last-child {
      margin-top: 1rem;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
  }
`;

const darkTheme = {
    background: '#131324',
    text: 'white',
};

const lightTheme = {
    background: 'white',
    text: 'black',
};


export default CurrencyConverter
