let currentLang = 'fr'
const originalTexts = {}
let originalTextsSaved = false // Nouvelle variable pour éviter les sauvegardes multiples

function saveOriginalTexts(keys) {
  for (const id in keys) {
    const value = keys[id]

    if (typeof value === "string") {
      const el = document.getElementById(id)
      if (el) {
        originalTexts[id] = el.innerHTML
      }
    } else if (typeof value === "object") {
      const parent = document.getElementById(id) || document
      for (const selector in value) {
        const translationKey = value[selector]
        const targets = Array.isArray(translationKey)
          ? parent.querySelectorAll(selector)
          : [parent.querySelector(selector)]

        targets.forEach((target, i) => {
          if (target) {
            const key = Array.isArray(translationKey) ? `${id}_${selector}_${i}` : `${id}_${selector}`
            originalTexts[key] = target.innerHTML
          }
        })
      }
    }
  }
}

async function changeLanguage(lang) {
  // Si la langue sélectionnée est déjà la langue actuelle, ne rien faire
  if (lang === currentLang && lang === 'fr') {
    console.log("La langue est déjà définie sur 'fr'. Restauration forcée des textes originaux.")
    for (const id in originalTexts) {
      const el = document.getElementById(id)
      if (el) {
        el.innerHTML = originalTexts[id]
      }
    }
    return
  }

  currentLang = lang
  localStorage.setItem('lang', lang)

  // Définir les clés globalement pour qu'elles soient accessibles partout dans la fonction
  const keys = {
    "connexion": "connexion",
    "calculatorElement": {
      "label[for='Prix du BTC']": "prix-btc",
      "label[for='Prix du GMT']": "prix-gmt",
      "label[for='TH power']": "puissance-th",
      "label[for='efficiency']": "conso-elect",
      "label[for='discount']": "remise",
      "p:nth-of-type(1)": "choix-entretien",
      "h4.cost-btc-title": "resultats",
      "p strong": [
        "revenu",
        "cout-btc",
        "cout-gmt",
        "revenu-net",
        "net-dollar"
      ]
    },
    "gmt-consommation-block": {
      "p:nth-of-type(1) strong": "depense-jour",
      "p:nth-of-type(2) strong": "depense-mois",
      "p:nth-of-type(3) strong": "depense-an",
    },
    "period": {
      "option[value='daily']": "period-daily",
      "option[value='monthly']": "period-monthly",
      "option[value='yearly']": "period-yearly"
    },
    "gmt-consommation-title": "cout-gmt",
    "promo-code": "promo-code",
    "promo-title": "soutien",
    "promo-txt": {
      "#promo-txt-1": "support-texte-1",
      "#promo-txt-2": "support-texte-2",
      "#promo-txt-3": "support-texte-3"
    },
    "next-halving": "next-halving",
    "footer-about": "footer-about",
    "footer-credits": "footer-credits",
    "footer-rights": "footer-rights"
  }

  // Sauvegarde des textes originaux si ce n'est pas déjà fait
  if (!originalTextsSaved) {
    saveOriginalTexts(keys)
    originalTextsSaved = true // Marque les textes comme sauvegardés
  }

  // Restauration des textes originaux si la langue est "fr"
  if (lang === 'fr') {
    for (const id in originalTexts) {
      const el = document.getElementById(id)
      if (el) {
        el.innerHTML = originalTexts[id]
      }
    }
    return
  }

  // Chargement des traductions pour une autre langue
  try {
    const res = await fetch(`./lang/${lang}.json`)
    const translations = await res.json()

    for (const id in keys) {
      const value = keys[id]

      if (typeof value === "string") {
        const el = document.getElementById(id)
        if (el && translations[value]) {
          el.innerHTML = translations[value]
        }
      } else if (Array.isArray(value)) {
        value.forEach(key => {
          const el = document.getElementById(id)
          if (el && translations[key]) {
            el.innerHTML = translations[key]
          }
        })
      } else if (typeof value === "object") {
        const parent = document.getElementById(id) || document
        for (const selector in value) {
          const translationKey = value[selector]

          if (Array.isArray(translationKey)) {
            const targets = parent.querySelectorAll(selector)
            targets.forEach((target, i) => {
              const key = translationKey[i]
              if (target && translations[key]) {
                target.innerHTML = translations[key]
              }
            })
          } else {
            const target = parent.querySelector(selector)
            if (target && translations[translationKey]) {
              target.innerHTML = translations[translationKey]
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Erreur lors du chargement des traductions :", error)
  }
}

// Sauvegarde des textes originaux et application de la langue au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "fr"
  const languageSelector = document.getElementById("language")

  if (languageSelector) {
    languageSelector.value = savedLang
    changeLanguage(savedLang)

    // Écouteur pour le changement de langue
    languageSelector.addEventListener("change", (e) => {
      const lang = e.target.value
      changeLanguage(lang)
    })
  } else {
    console.error("Le menu déroulant avec l'ID 'language' est introuvable.")
  }
})

