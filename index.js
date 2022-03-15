var inflationData = {
    "2000": 100.0,
    "2001": 102.7,
    "2002": 104.5,
    "2003": 105.9,
    "2004": 108.1,
    "2005": 110.6,
    "2006": 112.2,
    "2007": 114.6,
    "2008": 118.3,
    "2009": 118.9,
    "2010": 121.1,
    "2011": 125.0,
    "2012": 128.2,
    "2013": 130.7,
    "2014": 132.8,
    "2015": 134.0,
    "2016": 135.2,
    "2017": 138.0,
    "2018": 140.8,
    "2019": 142.9,
    "2020": 145.0,
    "2021": 149.0
}

function updateSliderStyles() {
    const slider = document.getElementById("year-slider")
    const min = slider.min
    const max = slider.max
    const value = slider.value
    slider.style.background = `linear-gradient(to right, #84B816 0%, #84B816 ${(value - min) / (max - min) * 100}%, #CDCDCD ${(value - min) / (max - min) * 100}%, #CDCDCD 100%)`
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
        syncSliderWithInput()
        if (validateForm()) {
            handleValues()
        } else {
            document.getElementById("lost-money").innerHTML = "Unable to calculate"
            document.getElementById("current-money").innerHTML = "Unable to calculate"
        }
    })


    document.getElementById("year-slider").addEventListener("input", () => {
        syncSliderWithInput()
        syncInputWithSlider()
        if (validateForm()) {
            handleValues()
        } else {
            document.getElementById("lost-money").innerHTML = "Unable to calculate"
            document.getElementById("current-money").innerHTML = "Unable to calculate"
        }

    })

}

function handleValues() {
    let selectedYear = numeral(document.getElementById("year-slider").value).value();
    let savings = numeral(document.getElementById("savings-input").value).value();
    let inflation = ((inflationData[2021] / inflationData[selectedYear]) * 100 - 100 ) / 100;
    let purchasingPowerToday = savings * (1 - inflation);
    let purchasingPowerLoss = savings - purchasingPowerToday;
    console.log(purchasingPowerToday);

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
    if(year >= 2000 && year <= 2021 && isYearValid)
    {
        document.getElementById("yearLabel").innerHTML = "";
        document.getElementById("year-slider").value = year;
        handleValues()
    }
    else if(year < 2000 || year > 2021)
    {
        if(year != ""){
            document.getElementById("yearLabel").innerHTML = "Please enter a year <br>between 2000 <br>and 2021";
        }
        else{
            document.getElementById("yearLabel").innerHTML = "";
        }
        document.getElementById("lost-money").innerHTML = "Unable to calculate"
        document.getElementById("current-money").innerHTML = "Unable to calculate"
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