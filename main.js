async function getCryptoPrices() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,gmt-token&vs_currencies=usd';

    try {
        const response = await fetch(url)
        const data = await response.json()

        document.getElementById("btc-value").textContent = data.bitcoin.usd + " $"
        document.getElementById("gmt-value").textContent = data["gmt-token"].usd + " $"
        document.getElementById("btc-price").value = Number(data.bitcoin.usd)
        document.getElementById("gmt-price").value = Number(data["gmt-token"].usd)

        updateThValue()

    } catch (error) {
        console.error("erreur lors de la récupération des prix :", error)
    }
}

// ======================================================================================================================

const select = document.getElementById("page-select")
if (select) {
  const currentPage = window.location.pathname.split("/").pop()
  Array.from(select.options).forEach(option => {
    if (option.value === currentPage) {
      option.selected = true
      
    }
  })
}
document.getElementById("page-select").addEventListener("change", function() {
  if (this.value) {
    window.location.href = this.value;
  }
  
})

// ======================================================================================================================

document.querySelectorAll(".input-decimal").forEach((input) => {
    input.addEventListener("input", (e) => {
        const value = e.target.value.replace(',', '.');

        const numberValue = parseFloat(value);
        if(isNaN(numberValue)) {
          alert("Valeur incorrecte !\n Veuillez entrer un nombre valide.");
        }
      })       
})

// ======================================================================================================================

document.querySelectorAll('button, span, select, a').forEach((el => {
    el.addEventListener('click', () => el.blur())
}))

// ======================================================================================================================

getCryptoPrices()

// ======================================================================================================================

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

// ======================================================================================================================

function scrollToElement () {
  const element = document.getElementById("mode-toggle")
  element.scrollIntoView({behavior : "smooth", block :"center"})
}

// ======================================================================================================================

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

// =======================================================================================================================

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

// =======================================================================================================================

const toggle = document.getElementById("mode-toggle")

toggle.addEventListener('change', ()=> {
const  gmtConsommation = document.querySelectorAll(".gmt-consommation")
const btcConsommation = document.getElementById("btc-service")   

const isGmtMode = toggle.checked

gmtConsommation.forEach(el => {
    el.style.display = isGmtMode ? "inline" : "none"
})
 
    btcConsommation.style.display = isGmtMode ? "none" : ""
 
})

// =======================================================================================================================
  
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

// ========================================================================================================================

