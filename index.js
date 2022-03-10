var inflationData = {
    "2000": 2.3,
    "2001": 2.7,
    "2002": 1.8,
    "2003": 1.3,
    "2004": 2.1,
    "2005": 2.3,
    "2006": 1.5,
    "2007": 2.2,
    "2008": 3.2,
    "2009": 0.5,
    "2010": 1.9,
    "2011": 3.3,
    "2012": 2.4,
    "2013": 2.0,
    "2014": 1.7,
    "2015": 0.9,
    "2016": 0.9,
    "2017": 2.1,
    "2018": 2.0,
    "2019": 1.5,
    "2020": 1.4,
    "2021": 2.8
}

function updateSliderStyles() {
    const slider = document.getElementById("loan-period")
    const min = slider.min
    const max = slider.max
    const value = slider.value
    slider.style.background = `linear-gradient(to right, #84B816 0%, #84B816 ${(value - min) / (max - min) * 100}%, #DEE2E6 ${(value - min) / (max - min) * 100}%, #DEE2E6 100%)`
    slider.style.borderRadius = "10px"
    slider.style.height = "9px"
    slider.oninput = function() {
        this.style.background = `linear-gradient(to right, #84B816 0%, #84B816 ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 100%)`
        this.style.borderRadius = "10px"
        this.style.height = "9px"
    }
}

function validateForm() {
    let savings = document.getElementById("savings-input");
    if (savings.value == "") {
        return false;
    }
    return true;
}

function addEventListeners() {
    document.getElementById("savings-input").addEventListener("input", () => {
        syncYearInputs()
        if (validateForm()) {
            handleValues()
        } else {
            document.getElementById("lost-money").innerHTML = "Unable to calculate"
            document.getElementById("current-money").innerHTML = "Unable to calculate"
        }
    })


    document.getElementById("loan-period").addEventListener("input", () => {
        syncYearInputs()
        if (validateForm()) {
            handleValues()
        } else {
            document.getElementById("lost-money").innerHTML = "Unable to calculate"
            document.getElementById("current-money").innerHTML = "Unable to calculate"
        }

    })

    //TODO: disable input between 2000 and 2021
    document.getElementById("year-input").addEventListener("input", () => {
        syncYearInputs()
        if (validateForm()) {
            handleValues()
        } else {
            document.getElementById("lost-money").innerHTML = "Unable to calculate"
            document.getElementById("current-money").innerHTML = "Unable to calculate"
        }
    })
}

function handleValues() {
    let iterationKey = numeral(document.getElementById("loan-period").value).value();
    let lostAmount;
    let sumOfLostAmount = 0;
    let currentAmount = numeral(document.getElementById("savings-input").value).value();


    do {
        lostAmount = (inflationData[iterationKey] * currentAmount) / 100
        currentAmount = currentAmount - lostAmount
        sumOfLostAmount += lostAmount;
        iterationKey++
    }
    while (iterationKey < 2022)
    lostAmount = lostAmount.toFixed(2)
    currentAmount = currentAmount.toFixed(2)
    document.getElementById("lost-money").innerHTML = sumOfLostAmount.toFixed(2);
    document.getElementById("current-money").innerHTML = currentAmount;

    formatCalculatedData();
}

function syncYearInputs() {
    document.getElementById("year-input").value = document.getElementById("loan-period").value
    document.getElementById("loan-period").value = document.getElementById("year-input").value
}

//TODO: rename loan-period id to year-slider
function setDefaultValues() {
    document.getElementById("year-input").value = 2015;
    document.getElementById("loan-period").value = 2015;
    document.getElementById("savings-input").value = 1000;
    formatInputData();
}

function formatInputData() {
    if (document.getElementById("savings-input").value < 1) {
        document.getElementById("savings-input").value = 1;
    } else if (document.getElementById("savings-input").value > 10000000) {
        document.getElementById("savings-input").value = 10000000;
    } else if (document.getElementById("savings-input").value % 1 != 0) {
        document.getElementById("savings-input").value = Math.floor(document.getElementById("savings-input").value)
    }
    var formattedData = numeral(document.getElementById("savings-input").value).format('0,0');
    document.getElementById("savings-input").value = formattedData + " €";
}

function formatCalculatedData() {
    var formattedLostMoney = numeral(document.getElementById("lost-money").innerHTML).format('0,0.00');
    document.getElementById("lost-money").innerHTML = formattedLostMoney + " €";

    var formattedCurrentMoney = numeral(document.getElementById("current-money").innerHTML).format('0,0.00');
    document.getElementById("current-money").innerHTML = formattedCurrentMoney + " €";
}

setDefaultValues()
updateSliderStyles()
addEventListeners()
handleValues()