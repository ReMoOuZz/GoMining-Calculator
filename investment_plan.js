function updateThValue() {
const thValue = document.getElementById("th-value");
const gmtValue = parseFloat(document.getElementById("gmt-value").textContent);
if (!isNaN(gmtValue) && gmtValue !== 0) {
    thValue.textContent = ((gmtValue * 136.5) * gmtValue).toFixed(2) + " $";
} else {
    thValue.textContent = "Erreur"
}}
