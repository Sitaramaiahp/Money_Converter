const dropdowns = document.querySelectorAll(".dropdown select");
const formCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");

for (let select of dropdowns) {
    for (currCode in country_code) {
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if (select.name == "from" && currCode == "USD") {
            newOption.selected = "selected";
        } else if (select.name == "to" && currCode == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = country_code[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

window.addEventListener("load", () => {
    getExchangeRate();
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = formCurr.value;
    formCurr.value = toCurr.value;
    toCurr.value = tempCode;
    updateFlag(formCurr);
    updateFlag(toCurr);
    getExchangeRate();
});

const getExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    const msg = document.querySelector(".msg");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    msg.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/df87aa8f4ac9b0c94551cd69/latest/${formCurr.value}`;
    let response = await fetch(url);
    let result = await response.json();
    let exchangeRate = result.conversion_rates[toCurr.value];
    let totalExchangeRate = (amtVal * exchangeRate).toFixed(3);
    msg.innerText = `${amtVal} ${formCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
}
