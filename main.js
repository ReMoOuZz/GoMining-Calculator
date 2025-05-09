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



const UserData = document.querySelectorAll("input")

UserData.forEach((input) => {
    input.addEventListener('change', ()=>{

const btcPrice = parseFloat(document.getElementById("btc-price").value)
const thPower = parseFloat(document.getElementById("th-power").value)
const efficiency = parseFloat(document.getElementById("efficiency").value)
const discount = parseFloat(document.getElementById("discount").value)

const tauxBtc = 53

const btcBrutRewards = (btcPrice * tauxBtc) / 1e8 * thPower / btcPrice
    
const electricityConsomation = (efficiency * thPower* 0.05 * 24 / 1000) 
const electricityConsomationBtc = electricityConsomation / btcPrice
    
const service = (0.0089 / btcPrice * thPower) 
    
const electricityConsomationFinal = electricityConsomationBtc * (1 - discount / 100)
const serviceFinal = service * (1 - discount / 100)

const totalReward = btcBrutRewards - electricityConsomationFinal - serviceFinal

const totalRewardDollar = totalReward * btcPrice

document.getElementById("income").textContent = btcBrutRewards.toFixed(8)
document.getElementById("discount-percentage").textContent = (electricityConsomationFinal + serviceFinal).toFixed(8)
document.getElementById("profit").textContent = totalReward.toFixed(8)
document.getElementById("profit-dollar").textContent = Math.floor(totalRewardDollar * 100)/100
})
}) 

const rewardTiming = document.getElementById("period")

rewardTiming.addEventListener("change", ()=> {
   
    const incomeElement = document.getElementById("income")
    const discountElement = document.getElementById("discount-percentage")
    const profitElement = document.getElementById("profit")
    const profitDollarElement = document.getElementById("profit-dollar")

    let income = parseFloat(incomeElement.textContent) || 0
    let discount = parseFloat(discountElement.textContent) || 0
    let profit = parseFloat(profitElement.textContent) || 0
    let dollarProfit = parseFloat(profitDollarElement.textContent) || 0

    if (rewardTiming.value === "monthly") {
        income *= 30
        discount *= 30
        profit *= 30
        dollarProfit *= 30
    } else if (rewardTiming.value === "yearly") {
        income *= 365
        discount *= 365
        profit *= 365
        dollarProfit *= 365
    } else if (rewardTiming.value === "daily") {
        income *= 1
        discount *= 1
        profit *= 1
        dollarProfit *= 1
    }

    incomeElement.textContent = income.toFixed(8)
    discountElement.textContent = discount.toFixed(8)
    profitElement.textContent = profit.toFixed(8)
    profitDollarElement.textContent = dollarProfit


})