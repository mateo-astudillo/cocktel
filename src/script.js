document.addEventListener("DOMContentLoaded", () => {
    const drinksWithInstructionsES = [11028, 17227, 11013, 16202, 17833, 14610, 15194, 12710, 15941, 11010];
    const main = document.getElementById("main");

    drinksWithInstructionsES.forEach(async (id) => {
        const drink = await getDataById(id);
        const card = createCard(drink["idDrink"], drink["strDrink"], drink["strDrinkThumb"], drink["strInstructionsES"]);
        main.appendChild(card);
    });
})

document.getElementById("searchButton").addEventListener("click", async() => {
    const searchedContainer = document.getElementById("searchedContainer");
    const searchInput = document.getElementById("searchInput");

    while (searchedContainer.firstChild) {
        searchedContainer.removeChild(searchedContainer.firstChild);
    }

    let cocktail = searchInput.value;
    if (!/^[A-Za-z ]+$/.test(cocktail)) {
        searchInput.setCustomValidity("Solo letras");
        setTimeout(() => {
            searchInput.value = "";
            searchInput.setCustomValidity("");
        }, 2000);
        return
    }
    searchCocktail(await getDataByName(cocktail), searchedContainer);
});

document.getElementById("submitButton").addEventListener("click", function(event) {
    event.preventDefault();
    validate();
    hideForm();
})

document.getElementById("cancelButton").addEventListener("click", function(event) {
    event.preventDefault();
    hideForm();
})
