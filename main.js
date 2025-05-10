// async function getCryptoPrices() {
//     const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,gmt-token&vs_currencies=usd';

//     try {
//         const response = await fetch(url)
//         const data = await response.json()

//         document.getElementById("btc-price").textContent = "$ " + data.bitcoin.usd
//         document.getElementById("gmt-price").textContent = "$ " + data["gmt-token"].usd
//     } catch (error) {
//         console.error("erreur lors de la récupération des prix :", error)
//     }
// }

// getCryptoPrices()

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

    
    updateBaseValues()
  }
  
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", recalculateRewards)
  })
  
  document.getElementById("period").addEventListener("change", recalculateRewards)
  
  

