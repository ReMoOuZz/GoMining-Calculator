function updateThValue() {
const thValue = document.getElementById("th-value");
const gmtValue = parseFloat(document.getElementById("gmt-value").textContent);
if (!isNaN(gmtValue) && gmtValue !== 0) {
    thValue.textContent = ((gmtValue * 136.5) * gmtValue).toFixed(2) + " $";
} else {
    thValue.textContent = "Erreur"
}}

const baseValue = {
    income: 0,
    discount: 0,
    discountGmt: 0,
    profit: 0,
    profitDollar: 0,
    thInvest: 0,
    duration: 0,
}

function updateBaseValues() {
    baseValue.income = parseFloat(document.getElementById("income").textContent) || 0
    baseValue.discount = parseFloat(document.getElementById("discount-percentage-btc").textContent) || 0
    baseValue.discountGmt = parseFloat(document.getElementById("discount-percentage-gmt").textContent) || 0
    baseValue.profit = parseFloat(document.getElementById("profit").textContent) || 0
    baseValue.profitDollar = parseFloat(document.getElementById("profit-dollar").textContent) || 0
    baseValue.thInvest = parseFloat(document.getElementById("th-power")).textContent || 0
    baseValue.duration = parseFloat(document.getElementById("duration").textContent) || 0
}

function recalculateRewards() {

  const btcPrice = parseFloat(document.getElementById("btc-price").value);
  const gmtPrice = parseFloat(document.getElementById("gmt-price").value);
  const thStart = parseFloat(document.getElementById("th-power").value);
  const efficiency = parseFloat(document.getElementById("efficiency").value);
  const discount = parseFloat(document.getElementById("discount").value);
  const monthlyTH = parseFloat(document.getElementById("investment").value);
  const months = parseInt(document.getElementById("duration").value);
  const thValue = parseFloat(document.getElementById("th-value").textContent);
  const isGmtMode = document.getElementById("mode-toggle").checked;
  const tauxBtc = 52;
  
  if (
    isNaN(btcPrice) || btcPrice === 0 ||
    isNaN(gmtPrice) || gmtPrice === 0 ||
    isNaN(thStart) || thStart === 0 ||
    isNaN(efficiency) || efficiency === 0 ||
    isNaN(discount) || isNaN(monthlyTH) || isNaN(months)
  ) {
    document.getElementById("income").textContent = "0";
    document.getElementById("discount-percentage-btc").textContent = "0";
    document.getElementById("discount-percentage-gmt").textContent = "0";
    document.getElementById("profit").textContent = "0";
    document.getElementById("profit-dollar").textContent = "0";
    document.getElementById("power-upgraded").textContent = "0";
    return;
  }

  let totalIncome = 0;
  let totalCostBtc = 0;
  let totalCostGmt = 0;
  let totalProfitBtc = 0;
  let finalTH = thStart;

    let lastDailyCostBtc = 0;
    let lastDailyCostGmt = 0;

  for (let month = 0; month < months; month++) {
    const dailyBtcBrutRewards = (btcPrice * tauxBtc) / 1e8 * finalTH / btcPrice;
    const dailyElectricityKwh = (efficiency * finalTH * 0.05 * 24) / 1000;
    const dailyElectricityBtc = dailyElectricityKwh / btcPrice;
    const dailyElectricityGmt = dailyElectricityKwh / gmtPrice;
    const dailyServiceBtc = (0.0089 / btcPrice) * finalTH;
    const dailyServiceGmt = (0.0089 / gmtPrice) * finalTH;

    const dailyCostBtc = (dailyElectricityBtc + dailyServiceBtc) * (1 - discount / 100);
    const dailyCostGmt = (dailyElectricityGmt + dailyServiceGmt) * (1 - discount / 100);

    const totalMonthIncome = dailyBtcBrutRewards * 30;
    const totalMonthCostBtc = dailyCostBtc * 30;
    const totalMonthCostGmt = dailyCostGmt * 30;

    const monthProfitBtc = totalMonthIncome - totalMonthCostBtc;

    totalIncome += totalMonthIncome;
    totalCostBtc += totalMonthCostBtc;
    totalCostGmt += totalMonthCostGmt;
    totalProfitBtc += monthProfitBtc;

    lastDailyCostBtc = dailyCostBtc;
    lastDailyCostGmt = dailyCostGmt;

    finalTH += monthlyTH;
  }

  const totalProfitDollar = totalProfitBtc * btcPrice;

  document.getElementById("income").textContent = totalIncome.toFixed(8);
  document.getElementById("discount-percentage-btc").textContent = totalCostBtc.toFixed(8);
  document.getElementById("discount-percentage-gmt").textContent = totalCostGmt.toFixed(2);
  document.getElementById("profit").textContent = totalProfitBtc.toFixed(8);
  document.getElementById("profit-dollar").textContent = totalProfitDollar.toFixed(2);
  document.getElementById("power-upgraded").textContent = finalTH.toFixed(2);


const thValueText = document.getElementById("th-value").textContent;
const thPrice = parseFloat(thValueText.replace("$", "").trim()) || 0;

const totalThInvested = monthlyTH * months * thPrice;
document.getElementById("th-cost-total").textContent = totalThInvested.toFixed(2);


  updateBaseValues()
}


document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", recalculateRewards)
})
