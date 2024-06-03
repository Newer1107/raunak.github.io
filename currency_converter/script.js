document.addEventListener("DOMContentLoaded", function() {
    fetch('https://v6.exchangerate-api.com/v6/b14e402f9e9c1e8755b15667/codes')
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                const supportedCodes = data.supported_codes;
                populateDropdowns(supportedCodes);
            } else {
                console.error("Error fetching currency codes:", data);
            }
        })
        .catch(error => console.error("Error fetching currency data:", error));
});

function populateDropdowns(supportedCodes) {
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");

    supportedCodes.forEach(codePair => {
        const [currency, country] = codePair;
        const optionText = `${currency} : (${country})`;

        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.text = optionText;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.text = optionText;
        toCurrencySelect.appendChild(optionTo);
    });

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
    const incode = fromCurrency.slice(0,2).toLowerCase();
    const toCurrency = document.getElementById("toCurrency").value;
    const outcode = toCurrency.slice(0,2).toLowerCase();
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
            resultDiv.innerHTML = `
                ${amount} ${fromCurrency} <img src="https://flagcdn.com/w40/${incode}.png"> = ${convertedAmount} ${toCurrency} <img src="https://flagcdn.com/w40/${outcode}.png">
                <br>
                Rate: 1 ${fromCurrency} = ${rate} ${toCurrency}
            `;
            loader.style.display = "none";
        })
        .catch(error => {
            console.error("Error fetching exchange rate:", error);
            resultDiv.textContent = "Error fetching exchange rate";
            loader.style.display = "none";
        });
}