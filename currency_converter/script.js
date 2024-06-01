document.addEventListener("DOMContentLoaded", function() {
    // Fetch list of currencies
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates); // Extract currency codes
            populateDropdowns(currencies);
        })
        .catch(error => console.error("Error fetching currency data:", error));
});

function populateDropdowns(currencies) {
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");

    currencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.text = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.text = currency;
        toCurrencySelect.appendChild(optionTo);
    });

    // Initialize Select2
    $('.currency-select').select2();
}

document.querySelector("button").addEventListener("click", function() {
    const loader = document.getElementById("loader");
    const resultDiv = document.getElementById("result");
    loader.style.display = "inline-block";
    
    setTimeout(() => {
        convertCurrency();
    }, 2000); // Show loader for 2 seconds
});

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultDiv = document.getElementById("result");
    const loader = document.getElementById("loader");

    if (amount === "" || isNaN(amount)) {
        alert("Please enter a valid amount");
        loader.style.display = "none";
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            loader.style.display = "none";
        })
        .catch(error => {
            console.error("Error fetching exchange rate:", error);
            resultDiv.textContent = "Error fetching exchange rate";
            loader.style.display = "none";
        });
}
