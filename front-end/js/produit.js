//retourne un élément du DOM à partir de son identifiant
const addHtml = document.getElementById("content");
//création d'un objet pour manipuler l'ID du produit
const searchParams = new URLSearchParams(window.location.search);
console.log(window.location.search); //ID apparait dans la console
//injecte l'id du produit dans le fetch
function afficheUnProduit (){
fetch(`http://localhost:3000/api/cameras/${searchParams.get("id")}`)
    .then((response) => {
        // me renvoie une première prommesse
        if (response.ok) {
            return (data = response.json()); // Si response ok, retourne un objet json
        } else {
            Promise.reject(response.status); // sinon, me retroune la cause de l'echec
        }
    })
    .then((data) => {
        console.log(data)
        //variable prix pour le diviser par 100
        let priceProdUnit = data.price / 100;
        //variable vide pour les lentilles
        let lens = "";
        //boucle pour selectionner la lentille
        data.lenses.forEach((lentille) => {
            lens += `<option value="${lentille}">${lentille}</option>`;
        });
        //Insertion du HTML dans le DOM
        //Interpolation de variable
        addHtml.innerHTML += `
                <div class="card produit">
                    <img alt="${data.name}" class="content__img" src="${data.imageUrl}">
                </div>
                <div class="card produit">
                    <h2 class="name">${data.name}</h2>
                    <p class="description">${data.description}</p>
                    <form>
                        <label class="text" for="quantiteProduit">Quantité</label>
                        <input id ="quantiteProduit" type="number" min="1" value="1"/>
                            <div>
                                <label class="text" for="lensSelect">Objectifs</label>
                                <select class="" id="lensSelect">
                                    ${lens}   
                                </select>        
                            </div>
                        <p class="price">Prix total : <span id="totalPrice">${priceProdUnit}</span> €</p>
                        <button id="btnAjoutId" type="button" class="btn-success">Ajouter au panier</button>                       
                    </form>   
                </div>
                `;
               
        //calcul pour le prix total
        calculePrice(priceProdUnit);
        //écoute le bouton
        const btnAjout = document.getElementById("btnAjoutId");

        btnAjout.addEventListener("click", () => {
            let lensElm = document.getElementById("lensSelect");
            let quantityElm = document.getElementById("quantiteProduit");
            //variable qui contient un objet avec les propriétés (clé et valeur)
            let objetCam = {
                _id: data._id,
                image: data.imageUrl,
                name: data.name,
                lens: lensElm.value,
                quantite: quantityElm.value,
                totalPrice: (data.price * parseInt(quantityElm.value)) / 100,
                price: data.price / 100,
            };
            //On passe en argument de la fonction mon objet
            ajoutLocalStorage(objetCam);
        });      
        
    });  
}
afficheUnProduit();
/** 
/**Fonction pour calculer le prix total en fonction de la quantité
 * 
 * @param {objet} priceProdUnit - prix unitaire
 * 
 */
function calculePrice(priceProdUnit) {
    let quantites = document.getElementById("quantiteProduit");
    quantites.addEventListener("change", (event) => {
        const result = document.getElementById("totalPrice");
        result.textContent = `${priceProdUnit}` * `${event.target.value}`;
    });
}
