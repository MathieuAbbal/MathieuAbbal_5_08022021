//retourne un élément du DOM à partir de son identifiant content
const addHtml = document.getElementById('content');
//fetch de l'API
function afficheLesProduits() {
  fetch('http://localhost:3000/api/cameras')
    .then(response => { // me renvoie une première prommesse
      if (response.ok) {
        // Si response ok, retourne un objet json
        return response.json()
      } else {
        // sinon, me retroune la cause de l'echec
        Promise.reject(response.status);
      };
    })
    // si response ok, renvoie d'une seconde promesse
    .then(data => {
      // boucle pour pour executer la fonction sur chaque éléments du tableau
      data.forEach(objet => {
        //variable prix pour le diviser par 100
        let priceProd = objet.price / 100;
        //Insertion du HTML dans le DOM
        addHtml.innerHTML += `                
                  <div class="card">
                    <img alt="${objet.name}" class="content__img" src="${objet.imageUrl}">
                    <h2 class="name">${objet.name}</h2>
                    <h3 class="price">${priceProd} €</h3>
                    <a href="produit.html?id=${objet._id}" class="content__btn">Voir Plus</a>
                  </div>                
                `;
      });
      //affiche les données dans la console
      console.log(data)
    }).catch((error) => {
      console.log(error);
    });
}
afficheLesProduits();