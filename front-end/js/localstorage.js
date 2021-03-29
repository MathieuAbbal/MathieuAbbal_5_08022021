/**Récupère le panier 
 * @return  - un tableau vide ou un objet
 */
function recuperationPanier() {
  //on récupére la valeur de la clé passée en paramètre dans la variable basket
  let basket = localStorage.getItem("basket");
  //si le panier et vide on retourne un tableau    
  if (basket == null) {
    return [];
  }
  //sinon on retourne la chaîne json transformé en objet JavaScript 
  return JSON.parse(basket);
}
/**Ajoute un produit au panier
 * @param {Objet} data - produit à ajouter au panier
 * 
 */
function ajoutLocalStorage(data) {
  //on déclare la variable qui à pour valeur la fonction de récueration de panier
  let basket = recuperationPanier();
  //**********    Verifie si le produit est déja dans le panier     **********
  //on teste si dans le panier qui est un tableau il y a l'id du produit et la lentille
  //on renvoie la valeur dans la variable product si la condition de test est respecté 
  //on convertit la chaîne de caractères en nombre et on ajoute la nouvelle quantité à la quantité existante
  //on enregistre la clé basket avec sa valeur convertie en chaîne JSON dans le localStorage
  if (basket.some((p) => p._id === data._id && p.lens === data.lens)) {
    let product = basket.find((p) => p._id === data._id && p.lens === data.lens);
    product.quantite = parseInt(product.quantite) + parseInt(data.quantite);
    localStorage.setItem("basket", JSON.stringify(basket));

  } else {
    //sinon on ajoute le produit au tableau et retourne la nouvelle taille du tableau
    //on enregistre la clé basket avec sa valeur convertie en chaîne JSON dans le localStorage
    basket.push(data);
    localStorage.setItem("basket", JSON.stringify(basket));

  }
  //me renvoi à la page panier
  window.location.assign("panier.html");
}

/**Supprime le produit du panier
 * 
 * @param {object}  _id    - identifiant du produit à supprimer
 */
function supprimeLocalStorage(_id) {
  //on récupère la valeur associée à la clé basket et on la transforme en objet Java Script
  let suppression = JSON.parse(localStorage.getItem("basket"));
  //on crée et retourne  un tableau si id  est différent
  const supressionPanier = suppression.filter((objet) => objet._id !== _id);
  //on enregistre dans le localStorage le panier avec pour valeur la variable supressionPanier en Json
  localStorage.setItem("basket", JSON.stringify(supressionPanier));
  //si le panier est vide on vide les clés stockées
  if (supressionPanier == 0) {
    localStorage.removeItem('basket');
  }
  //charge et affiche la page panier
  window.location.assign("panier.html");

  console.log("le panier est vide");
}
/**
* Fonction prix total Panier
*/
function calculPrixPanier() {
  //on récupére la valeur de la clé passée en paramètre dans la variable itemPrice sous forme d'objet JavaScript 
  //on applique une fonction qui traite chaque valeur pour la reduire à une seule en les ajoutants 
  let basket = recuperationPanier()
  let totalPriceItem = basket.reduce((accumulator, item) => {
    return accumulator + item.totalPrice;
  }, 0);
  //on retourne la valeur totale
  return totalPriceItem;
}



