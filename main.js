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

// const toggle = document.getElementById('mode-toggle')
// toggle.addEventListener('change', ()=> {
//     if(toggle.checked) {
//         console.log("mode BTC");
//     } else  {
//         console.log("Mode GMT");
//     }
// })

   
const baseValues = {
    income: 0,
    discount: 0,
    profit: 0,
    profitDollar: 0
  }
  
  function updateBaseValues() {
    baseValues.income = parseFloat(document.getElementById("income").textContent) || 0
    baseValues.discount = parseFloat(document.getElementById("discount-percentage").textContent) || 0 
    baseValues.profit = parseFloat(document.getElementById("profit").textContent) || 0
    baseValues.profitDollar = parseFloat(document.getElementById("profit-dollar").textContent) || 0
  }
  
  function recalculateRewards() {
    const btcPrice = parseFloat(document.getElementById("btc-price").value)
    const thPower = parseFloat(document.getElementById("th-power").value)
    const efficiency = parseFloat(document.getElementById("efficiency").value)
    const discount = parseFloat(document.getElementById("discount").value)
    const tauxBtc = 53
  
    const btcBrutRewards = (btcPrice * tauxBtc) / 1e8 * thPower / btcPrice   
    const electricityConsomation = (efficiency * thPower * 0.05 * 24 / 1000) 
    const electricityConsomationBtc = electricityConsomation / btcPrice  
    const service = (0.0089 / btcPrice * thPower) 
  
    const electricityConsomationFinal = electricityConsomationBtc * (1 - discount / 100)
    const serviceFinal = service * (1 - discount / 100)
  
    const totalReward = btcBrutRewards - electricityConsomationFinal - serviceFinal
    const totalRewardDollar = totalReward * btcPrice
  
    const mode = document.getElementById("period").value
    let multiply = 1
    if (mode === "monthly") multiply = 30
    else if (mode === "yearly") multiply = 365
  
    document.getElementById("income").textContent = (btcBrutRewards * multiply).toFixed(8)
    document.getElementById("discount-percentage").textContent = ((electricityConsomationFinal + serviceFinal) * multiply).toFixed(8)
    document.getElementById("profit").textContent = (totalReward * multiply).toFixed(8)
    document.getElementById("profit-dollar").textContent = (totalRewardDollar * multiply).toFixed(2)
  
    updateBaseValues()
  }
  
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", recalculateRewards)
  })
  
  document.getElementById("period").addEventListener("change", recalculateRewards)
  
  

