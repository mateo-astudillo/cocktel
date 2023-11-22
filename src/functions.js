const getDataByName = async(cocktail) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
    console.log(url)
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
    $drinkButton.textContent = "dar reseña".toUpperCase();
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

function showForm(id, name) {
    document.getElementById('containerForm').style.display = "block";
    document.getElementById("titleForm").innerHTML = "Valorar " + name;
}