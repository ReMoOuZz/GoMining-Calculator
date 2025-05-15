async function getCryptoPrices() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,gmt-token&vs_currencies=usd';

    try {
        const response = await fetch(url)
        const data = await response.json()

        document.getElementById("btc-value").textContent = data.bitcoin.usd + " $"
        document.getElementById("gmt-value").textContent = data["gmt-token"].usd + " $"
        document.getElementById("btc-price").value = data.bitcoin.usd
        document.getElementById("gmt-price").value = data["gmt-token"].usd
    } catch (error) {
        console.error("erreur lors de la récupération des prix :", error)
    }
}

document.querySelectorAll("input-decimal").forEach((input) => {
    input.addEventListener("input", (e) => {
        const value = e.target.value.replace(',', '.');

        const numberValue = parseFloat(value);
        if(!isNaN(numberValue)) {
          alert("Valeur incorrecte !\n Veuillez entrer un nombre valide.");
        }
      })       
})

document.querySelectorAll('button, span, seleclt, a').forEach((el => {
    el.addEventListener('click', () => el.blur())
}))

getCryptoPrices()

function DisplayWarning (id) {
  const warning = document.getElementById(id)
  if (warning) {
    warning.addEventListener("click", ()=> {
    alert("🚧 En construction 🚧 !\n Cette fonctionnalité arrive bientôt !")
    return
    })
  }
}

DisplayWarning("button-warning")
DisplayWarning("language")

function scrollToElement () {
  const element = document.getElementById("mode-toggle")
  element.scrollIntoView({behavior : "smooth", block :"center"})
}

const adresses = {
  text1: "0x9480487Df73a8BCc78031A5E09C752613186D472",
  text2: "9XBU3c4SVNrVaeP99HopTsc8yYrjJaEXjVav5TxL3bHM"
};

function copyTexte(button) {
  const idTexte = button.getAttribute("data-texte-id");
  const texte = adresses[idTexte]; 

  if (!texte) {
    console.warn("Adresse introuvable pour : " + idTexte);
    return;
  }

  navigator.clipboard.writeText(texte)
    .then(() => {
      const message = button.querySelector(".message-copy");
      message.classList.add("visible");
      setTimeout(() => {
        message.classList.remove("visible");
      }, 400);
    })
    .catch(err => {
      console.error("Erreur de copie :", err);
    });
}


const toggle = document.getElementById("mode-toggle")

toggle.addEventListener('change', ()=> {
const  gmtConsommation = document.querySelectorAll(".gmt-consommation")
const btcConsommation = document.getElementById("btc-service")   

const isGmtMode = toggle.checked

gmtConsommation.forEach(el => {
    el.style.display = isGmtMode ? "inline" : "none"
})
 {
    btcConsommation.style.display = isGmtMode ? "none" : ""
 }
})

const baseValues = {
    income: 0,
    discount: 0,
    discountGmt : 0,
    profit: 0,
    profitDollar: 0
  }
  
  function updateBaseValues() {
    baseValues.income = parseFloat(document.getElementById("income").textContent) || 0
    baseValues.discount = parseFloat(document.getElementById("discount-percentage-btc").textContent) || 0 
    baseValues.discountGmt = parseFloat(document.getElementById("discount-percentage-gmt").textContent) || 0
    baseValues.profit = parseFloat(document.getElementById("profit").textContent) || 0
    baseValues.profitDollar = parseFloat(document.getElementById("profit-dollar").textContent) || 0
  }
  
  function recalculateRewards() {

    const btcPrice = parseFloat(document.getElementById("btc-price").value) 
    const gmtPrice = parseFloat(document.getElementById("gmt-price").value) 
    const thPower = parseFloat(document.getElementById("th-power").value) 
    const efficiency = parseFloat(document.getElementById("efficiency").value) 
    const discount = parseFloat(document.getElementById("discount").value) 
    const discountGmt = parseFloat(document.getElementById("discount-percentage-gmt").value) 
    const tauxBtc = 53

 if (
        isNaN(btcPrice) || btcPrice === 0 ||
        isNaN(gmtPrice) || gmtPrice === 0 ||
        isNaN(thPower) || thPower === 0 ||
        isNaN(efficiency) || efficiency === 0 ||
        isNaN(discount) || discount === 0 
    ) {
        document.getElementById("income").textContent = "0"
        document.getElementById("discount-percentage-btc").textContent = "0"
        document.getElementById("discount-percentage-gmt").textContent = "0"
        document.getElementById("profit").textContent = "0"
        document.getElementById("profit-dollar").textContent = "0"
        return
    }

    const btcBrutRewards = (btcPrice * tauxBtc) / 1e8 * thPower / btcPrice   
    const electricityConsomation = (efficiency * thPower * 0.05 * 24 / 1000) 
    const electricityConsomationBtc = electricityConsomation / btcPrice
    const electricityConsomationGmt = electricityConsomation / gmtPrice  
    const service = (0.0089 / btcPrice * thPower) 
    const serviceGmt = (0.0089 / gmtPrice * thPower)
  
    const electricityConsomationFinal = electricityConsomationBtc * (1 - discount / 100)
    const electricityConsomationFinalGmt = electricityConsomationGmt * (1 - discount / 100)
    const serviceFinal = service * (1 - discount / 100)
    const serviceFinalGmt = serviceGmt *(1 -discount / 100)

    const isGmtMode = toggle.checked;

    const totalFees = isGmtMode 
      ? (electricityConsomationFinalGmt + serviceFinalGmt) * (gmtPrice / btcPrice)
      : electricityConsomationFinal + serviceFinal
  
    const totalReward = btcBrutRewards - totalFees
    const totalRewardDollar = totalReward * btcPrice
  
    const mode = document.getElementById("period").value
    let multiply = 1
    if (mode === "monthly") multiply = 30
    else if (mode === "yearly") multiply = 365
  
    document.getElementById("income").textContent = (btcBrutRewards * multiply).toFixed(8)
    document.getElementById("discount-percentage-btc").textContent = ((electricityConsomationFinal + serviceFinal) * multiply).toFixed(8)
    document.getElementById("discount-percentage-gmt").textContent = ((electricityConsomationFinalGmt + serviceFinalGmt) * multiply).toFixed(2)
    document.getElementById("profit").textContent = (totalReward * multiply).toFixed(8)
    document.getElementById("profit-dollar").textContent = (totalRewardDollar * multiply).toFixed(2)

    if (isGmtMode) {
      document.getElementById("daily-charging-cost").textContent = (electricityConsomationFinalGmt + serviceFinalGmt).toFixed(2)
      document.getElementById("monthly").textContent = ((electricityConsomationFinalGmt + serviceFinalGmt) * 30).toFixed(2)
      document.getElementById("yearly").textContent =((electricityConsomationFinalGmt + serviceFinalGmt) * 365).toFixed(2)
    }

    
    updateBaseValues()
  }
  
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", recalculateRewards)
  })
  
  document.getElementById("period").addEventListener("change", recalculateRewards)
  
  let countDownDate = new Date("april,01 2028 10:00:00");
  let x = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
    let days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector("#countdown").innerHTML = `
    <div class= 'tag'>
        <span class='value'>${years}</span>
        <span class='label'>Années</span>
        </div>
    <div class= 'tag'> 
        <span class= 'value'>${days}</span>
        <span class='label'>Jours</span>
        </div>
    <div class= 'tag'> 
        <span class= 'value'>${hours}</span>
        <span class='label'>Heures</span>
        </div>
    <div class= 'tag'> 
        <span class= 'value'>${minutes}</span>
        <span class='label'>minutes</span>
        </div>
    <div class= 'tag'> 
        <span class= 'value'>${seconds}</span>
        <span class='label'>secondes</span>
        </div>
    `;
    if (distance < 0) {
      clearInterval(x);
      document.querySelector("#countdown").innerHTML = "<span>Terminé !!</span>";
    }
  }, 1000);



