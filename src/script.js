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
    const searchedConteiner = document.getElementById("searchedContainer");
    const searchInput = document.getElementById("searchInput");

    while (searchedConteiner.firstChild) {
        searchedConteiner.removeChild(searchedConteiner.firstChild);
    }

    let cocktail = searchInput.value;
    if (!/^[A-Za-z ]+$/.test(cocktail)) {
        searchInput.setAttribute("id", "invalidText");
        setTimeout(() => {
            searchInput.setAttribute("id", "searchInput");
            searchInput.value = "";
        }, 2000);
        return
    }

    const drinks = await getDataByName(cocktail);
    console.log(drinks);
    if (drinks == null) {
        setTimeout(() => {
            document.getElementById("messageNotFound").style = "display: block;";

            searchInput.value = "";
        }, 2000);
        document.getElementById("notFound").style = "display: none;";
        return
    }

    drinks.forEach((drink) => {
        let strInstruction = drink["strInstructionsES"];
        console.log(strInstruction);
        if (strInstruction == null) {
            strInstruction = drink["strInstructions"]
        }
        const card = createCard(drink["idDrink"], drink["strDrink"], drink["strDrinkThumb"], strInstruction);
        searchedConteiner.appendChild(card);
    })
    searchInput.value = "";
});

document.getElementById("submitButton").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("containerForm").style.display = "none";

})
