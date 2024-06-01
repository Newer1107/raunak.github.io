document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert-button');
    const resultDiv = document.getElementById('result');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                fromCurrency.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.textContent = currency;
                toCurrency.appendChild(optionTo);
            });
        });

    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }

        resultDiv.innerHTML = '<div class="loader"></div>';

        const showResult = (convertedAmount) => {
            setTimeout(() => {
                resultDiv.innerHTML = `${amount} ${from} = ${convertedAmount} ${to}`;
            }, 500);
        };

        fetch(`${apiUrl}?base=${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                showResult(convertedAmount);
            })
            .catch(error => {
                console.error('Error fetching conversion rate:', error);
                alert('Error fetching conversion rate. Please try again.');
                resultDiv.innerHTML = '';
            });
    });
});
