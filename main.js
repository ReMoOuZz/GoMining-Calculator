async function getCryptoPrices() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,gmt-token&vs_currencies=usd';

    try {
        const response = await fetch(url)
        const data = await response.json()

        document.getElementById("btc-price").textContent = "$ " + data.bitcoin.usd
        document.getElementById("gmt-price").textContent = "$ " + data["gmt-token"].usd
    } catch (error) {
        console.error("erreur lors de la récupération des prix :", error)
    }
}

getCryptoPrices()

// const toggle = document.getElementById('mode-toggle')
// toggle.addEventListener('change', ()=> {
//     if(toggle.checked) {
//         console.log("mode BTC");
//     } else  {
//         console.log("Mode GMT");
//     }
// })