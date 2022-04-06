var years = Object.keys(inflationData);
var lastYear = years[years.length - 1];

addLastYear()


function addLastYear() {
    document.getElementById("last-range-year").innerHTML = lastYear;
    document.getElementById("year-slider").max = lastYear;
    document.getElementById	("real-data-text").innerHTML = "Bei der Berechnung wurde die tatsächliche Inflation in Österreich in den Jahren 2000 bis " + (lastYear-1) + " laut Verbraucherpreisindex berücksichtigt."
}

function updateSliderStyles() {
    const slider = document.getElementById("year-slider")
    const min = slider.min
    const max = slider.max
    const value = slider.value
    slider.style.background = `linear-gradient(to right, #990000 0%, #990000 ${(value - min) / (max - min) * 100}%, #DEE2E6 ${(value - min) / (max - min) * 100}%, #DEE2E6 100%)`
    slider.style.borderRadius = "10px"
    slider.style.height = "9px"
    slider.oninput = function() {
        this.style.background = `linear-gradient(to right, #990000 0%, #990000 ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 100%)`
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
        syncSliderWithInput()
        if (validateForm()) {
            handleValues()
        } else {
            document.getElementById("lost-money").innerHTML = "0 EUR"
            document.getElementById("current-money").innerHTML = "0 EUR"
        }
    })


    document.getElementById("year-slider").addEventListener("input", () => {
        syncSliderWithInput()
        syncInputWithSlider()
        if (validateForm()) {
            handleValues()
        } else {
            document.getElementById("lost-money").innerHTML = "0 EUR"
            document.getElementById("current-money").innerHTML = "0 EUR"
        }

    })
}

function handleValues() {
    let selectedYear = numeral(document.getElementById("year-slider").value).value();
    let savings = numeral(document.getElementById("savings-input").value).value();
    let inflation = ((inflationData[lastYear] / inflationData[selectedYear]) * 100 - 100 ) / 100;
    let purchasingPowerToday = savings * (1 - inflation);
    let purchasingPowerLoss = savings - purchasingPowerToday;

    document.getElementById("lost-money").innerHTML = purchasingPowerLoss.toFixed(2);
    document.getElementById("current-money").innerHTML = purchasingPowerToday;

    formatCalculatedData();
}

function syncSliderWithInput() {
    document.getElementById("year-input").value = document.getElementById("year-slider").value
    document.getElementById("year-slider").value = document.getElementById("year-input").value
}

function syncInputWithSlider(){
    let year = document.getElementById("year-input").value
    let isYearValid = document.getElementById("year-input").validity.valid
    if(year >= 2000 && year <= lastYear && isYearValid)
    {
        document.getElementById("yearLabel").innerHTML = "";
        document.getElementById("year-slider").value = year;
        handleValues()
    }
    else if(year < 2000 || year > lastYear || isNaN(year))
    {
        if(year != ""){
            document.getElementById("yearLabel").innerHTML = "Bitte geben Sie ein <br> Jahr zwischen 2000 <br> und " + lastYear + " ein";
        }
        else{
            document.getElementById("yearLabel").innerHTML = "";
        }
        document.getElementById("lost-money").innerHTML = "0 EUR"
        document.getElementById("current-money").innerHTML = "0 EUR"
    }
    updateSliderStyles()
}

function setDefaultValues() {
    document.getElementById("year-input").value = 2015;
    document.getElementById("year-slider").value = 2015;
    document.getElementById("savings-input").value = 1000;
    formatInputData();
}

function formatInputData() {
    if (document.getElementById("savings-input").value < 1) {
        document.getElementById("savings-input").value = 1;
    } else if (document.getElementById("savings-input").value > 10000000) {
        document.getElementById("savings-input").value = 10000000;
    } else if (numeral(document.getElementById("savings-input").value).value() % 1 != 0) {
        document.getElementById("savings-input").value = Math.floor(document.getElementById("savings-input").value)
    }
    var formattedData = numeral(document.getElementById("savings-input").value).format('0,0');
    document.getElementById("savings-input").value = formattedData + " EUR";
}

function formatCalculatedData() {
    var formattedLostMoney = numeral(document.getElementById("lost-money").innerHTML).format('0,0.00');
    document.getElementById("lost-money").innerHTML = formattedLostMoney + " EUR";

    var formattedCurrentMoney = numeral(document.getElementById("current-money").innerHTML).format('0,0.00');
    document.getElementById("current-money").innerHTML = formattedCurrentMoney + " EUR";
}

setDefaultValues()
updateSliderStyles()
addEventListeners()
handleValues()

