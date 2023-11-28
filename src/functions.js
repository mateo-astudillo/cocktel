const getDataByName = async(cocktail) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error server");
    }
    const data = await response.json();
    return data["drinks"];
}

const getDataById = async (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error server");
    }
    const data = await response.json();
    return data["drinks"][0];
}

const createCard = (id, name, sourceImage, instruction) => {
    // ELEMENTS
    const $cardConteiner = document.createElement("div");
    const $drinkName = document.createElement("h3");
    const $drinkImage = document.createElement("img");
    const $drinkInstruction = document.createElement("p");
    const $drinkInstructionContainer = document.createElement("div");
    const $drinkButton = document.createElement("button");

    // TITLE
    $drinkName.textContent = name;
    $drinkName.setAttribute("class", "drinkTitle");

    // IMAGE
    $drinkImage.setAttribute("src", sourceImage);
    $drinkImage.setAttribute("class", "drinkImage");

    // INSTRUCTION
    $drinkInstruction.textContent = instruction;
    $drinkInstruction.setAttribute("class", "drinkInstruction")

    $drinkInstructionContainer.setAttribute("class", "drinkInstructionContainer");
    $drinkInstructionContainer.appendChild($drinkInstruction)

    // BUTTON
    $drinkButton.textContent = "DAR RESEÑA";
    $drinkButton.setAttribute("class", "drinkButton")
    $drinkButton.addEventListener("click", () => {
        showForm(id, name);
    });

    // CARD
    $cardConteiner.setAttribute("class", "drink")
    $cardConteiner.setAttribute("id", id)
    $cardConteiner.appendChild($drinkName);
    $cardConteiner.appendChild($drinkImage);
    $cardConteiner.appendChild($drinkInstructionContainer);
    $cardConteiner.appendChild($drinkButton);

    return $cardConteiner
}

function searchCocktail(drinks, searchedContainer) {
    console.log(drinks);
    if (drinks == null) {
        const notFoundContainer = document.getElementById("notFoundContainer");
        notFoundContainer.style.display = "block";
        setTimeout(() => {
            searchInput.value = "";
            notFoundContainer.style.display = "none";
        }, 2000);
        return
    }

    drinks.forEach((drink) => {
        let strInstruction = drink["strInstructionsES"];
        if (strInstruction == null)
            strInstruction = drink["strInstructions"]
        const card = createCard(drink["idDrink"], drink["strDrink"], drink["strDrinkThumb"], strInstruction);
        searchedContainer.appendChild(card);
    })
    searchInput.value = "";
}

function showForm(id, name) {
    document.getElementById("containerForm").style.display = "flex";
    document.getElementById("titleForm").innerHTML = "Valorar " + name;
}

function hideForm() {
    document.getElementById("containerForm").style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("observation").value = "";
}

function validate() {
    const name = document.getElementById("name")
    const surname = document.getElementById("surname")
    const mail = document.getElementById("mail")
    const observation = document.getElementById("observation")
    return true;
}