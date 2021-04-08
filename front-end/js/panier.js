const addHtml = document.getElementById("content");//retourne un élément du DOM à partir de son identifiant content
const prixInHtml = document.getElementById("finalPrice");//retourne un élément du DOM à partir de son identifiant finalPrice
const basket = recuperationPanier();//constante qui à pour valeur la fonction de récueration de panier


if (basket.length > 0) {
    //on créer une boucle pour parcourir les éléments du tableau et générer le HTML 
    //on fait une interpolation de variable
    basket.forEach((objet) => {
        addHtml.innerHTML += `
            <div class="card">
                <div>
                    <img alt="${objet.name}" class="content__img" src="${objet.image}">
                </div>

                <div>
                    <a href="produit.html?id=${objet._id}"><h2 class="name">${objet.name}</h2></a>
                    <p class="text">Quantité : ${objet.quantite}</p>
                    <p class="text">Lentilles : ${objet.lens}</p>
                </div>

                <div class="price">
                    <p class="prixProduitPanier">Prix : <span>${objet.totalPrice} €</span></p>   
                </div>

                <div>
                    <button class="btn-success" onclick="supprimeLocalStorage('${objet.lens}')">Supprimer</button>  
                </div>
            </div>
            `;
    });
} else {
    // HTML panier vide
    addHtml.innerHTML = `
        <div class="card empty">
            <img class="content__img" alt="photo de l'article" src="/img/empty.png" />
            <p class="text__empty ">Votre panier est vide </p>
        </div>`;
}
//on génére le HTML dans le DOM pour le prix total
prixInHtml.innerHTML = calculPrixPanier() + " € ";

console.log(basket)
//Validation de formulaire
//cible le bouton du formulaire et ajoute un évenement
//parcourt tout les éléments et vérifie si il est valide
document.querySelector('#formulaire').addEventListener("click", function () {
    var valid = true;
    for (let input of document.querySelectorAll(".form input")) {
        valid &= input.reportValidity();
        if (!valid) {
            break;
        }
    }
});


//retourne un élément du DOM à partir de son identifiant
const lastname = document.getElementById('nom');
const firstname = document.getElementById('prenom');
const address = document.getElementById('adresse');
const city = document.getElementById('ville');
const mail = document.getElementById('email');

const form = document.querySelector("#formulaire");


//ajoute un évenement 
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let data = recuperationPanier();
    if (basket == 0) {
        alert("Votre panier est vide")
    }
    else {
        // camera en tant que tableau à envoyer en POST
        const products = [];
        //on créer une boucle pour parcourir les éléments du tableau
        data.forEach((camera) => {
            //on ajoute les éléments au tableau
            products.push(camera._id);
        });
        console.log(products)
        // utilisateur à envoyer en objet en POST
        let contact = {
            firstName: firstname.value,
            lastName: lastname.value,
            address: address.value,
            city: city.value,
            email: mail.value,
        };
        localStorage.setItem("contact", JSON.stringify(contact));
        // créer donnees comme objet contact + tableau products
        const donnees = { contact, products };

        // en-têtes pour la requête pour le POST
        // qui contient mon objet donnees converti en Json
        // on indique la nature et le format du document
        const options = {
            method: "POST",
            body: JSON.stringify(donnees),
            headers: {
                "Content-Type": "application/json",
            },
        };
        function postFetch() {
            // la requête POST 
            fetch("http://localhost:3000/api/cameras/order", options)
                // reçoit les données du back
                .then(response => { // me renvoie un premiere prommesse
                    if (response.ok) {
                        return response.json() // Si response ok, retourne un objet json
                    } else {
                        Promise.reject(response.status); // sinon, me retroune la cause de l'echec
                    };
                })

                // traitement pour l'obtention du numéro de commmande
                .then((dataPost) => {
                    const orderId = dataPost.orderId;
                    window.location.assign(`confirmation.html?ncomm=${orderId}`);
                })
        }
        postFetch();
    }
});
