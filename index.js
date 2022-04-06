function loadJS(FILE_URL) {
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    document.body.appendChild(scriptEle);  
}

function loadCSS(FILE_URL) {
  let style = document.createElement("link");
  style.setAttribute("href", FILE_URL);
  style.setAttribute("rel", "stylesheet");
  style.setAttribute("type", "text/css")
  document.getElementsByTagName("head")[0].appendChild(style)
}

function loadBawag() {
  loadCSS("bawag/bawag.css");
  fetch('bawag/bawag.html')
  .then(res => res.text().then((html) => {
      document.getElementsByTagName("body")[0].innerHTML = html;
      loadJS("bawag/bawag.js");
    }))  
}

function loadEasybank() {
  loadCSS("easybank/easybank.css");
  fetch('easybank/easybank.html')
  .then(res => res.text().then((html) => {
    document.getElementsByTagName("body")[0].innerHTML = html;
    loadJS("easybank/easybank.js");
  }))
}

function loadSite() {
  var url = window.location.href; 
  switch(url){
    case url.includes('bawag-inflation-calculator.netlify.app/'):
    loadBawag()
    break;
    case url.includes('easybank-inflation-calculator.netlify.app/'):
    loadEasybank()
    break;
  }
}


loadSite()





