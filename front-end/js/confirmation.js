/**
 * affiche le numero de commande
 */
//retourne un élément du DOM à partir de son identifiant numCom 
const addNumero = document.getElementById('numCom');
//nouvel objet qui permet de manipuler l'identifiant de commande
const params = new URLSearchParams(window.location.search);
console.log(window.location.search)
//récupère le numéro de commande avec la methode get
const numCommande = params.get('ncomm');
//affiche le numéro de commande dans le html
addNumero.innerHTML = numCommande;
/**
 * affiche le prix total
 */
//retourne un élément du DOM à partir de son identifiant finalPrice
const addPrice = document.getElementById('finalPrice');
//génére le HTML dans le DOM
addPrice.innerHTML = calculPrixPanier() + " € ";
/**
 * supprime le panier du local storage
*/

localStorage.removeItem('basket');

