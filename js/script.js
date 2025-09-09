let currentPagUrl = 'https://rickandmortyapi.com/api/character'

window.onload = async () => {
    try{
        await loadCharacters(currentPagUrl);
    }   catch (error) {
        console.log(error);
        alert('Error ao carregar os cards');      
    }

    const nextButton = document.getElementById('nextBtn')
    const prevButton = document.getElementById('prevBtn')

    nextButton.addEventListener('click',loadNextPage)
    prevButton.addEventListener('click',loadPreviousPage)
};

async function loadCharacters(url) {

    const mainContent = document.getElementById('main_content');
    mainContent.innerHTML = "";  //Limpar os resultados anteriores.   

    try{
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => { 
            const card = document.createElement("div");
            card.style.backgroundImage = `url(${character.image})`;
            card.className = "cards";

            const characterNameBG = document.createElement("div");
            characterNameBG.className = "character_name_bg";

            const characterName = document.createElement("span");
            characterName.className = "character_name";
            characterName.innerText = `${character.name}`;

            characterNameBG.appendChild(characterName);
            card.appendChild(characterNameBG);

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById('modal_content')
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url(${character.image})`
                characterImage.className = "character_image"

                const name = document.createElement('span')
                name.className = "character_details"
                name.innerText = `Nome: ${character.name}`

                const characterStatus = document.createElement('span')
                characterStatus.className = "character_details"
                characterStatus.innerText = `Status: ${convertStatus(character.status)}`

                const species = document.createElement('span')
                species.className = "character_details"
                species.innerText = `Especie: ${convertSpecies(character.species)}`
                
                const gender = document.createElement('span')
                gender.className = "character_details"
                gender.innerText = `Gênero: ${convertGender(character.gender)}`

                const origin = document.createElement('span')
                origin.className = "character_details"
                origin.innerText = `origen: ${character.origin.name === "unknown" ? "desconhecida" : "character.origin.name"}`
                
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterStatus)
                modalContent.appendChild(species)
                modalContent.appendChild(gender)
                modalContent.appendChild(origin)

            }

            mainContent.appendChild(card);
        });

        const nextButton = document.getElementById('nextBtn');
        const prevButton = document.getElementById('prevBtn');

        nextButton.disabled = !responseJson.info.next;
        prevButton.disabled = !responseJson.info.prev;

        prevButton.style.visibility = responseJson.info.prev? "visible" : "hidden"

        currentPagUrl = url;
        
    }   catch(error){
        alert('Erro ao carregar os personagens');
        console.log(error);
    }
}


function hideModal(){
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}


function converteyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "marom",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink:  "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida"
    };
    
    return cores[eyeColor.toLowerCase()] || eyeColor;
}
function convertStatus(status) { 
    const characterStatus = {
    alive: "vivo",
    dead: "morto",
    unknown: "desconhecido",
    };

    return characterStatus[status.toLowerCase()] || status;
}
function convertSpecies(species) {
    const characterSpecies = {
        human: "humano",
        alien: "alienígena",
        humanoide: "humanoide",
        animal: "animal",
        humanoide: "humanoide",
        "mythological creature": "criatura mitologica",
        disease: "doença",
        robot: "robo",
        unknown: "desconhecida",
    };
    
    return characterSpecies[species.toLowerCase()] || species;
}
function convertGender(gender) {
    const characterGender = {
        male: "macho",
        female: "fêmea",
        unknown: "desconhecido",
    };
    return characterGender[gender.toLowerCase()] || gender;
}

async function loadNextPage() {
    if(!currentPagUrl) return;

    try{
        const response = await fetch(currentPagUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.info.next)

    }catch(error){
        console.log(error)
        alert('Erro ao carregar a proxima página')
    }
    
}

async function loadPreviousPage() {
    if(!currentPagUrl) return;

    try{
        const response = await fetch(currentPagUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.info.prev)

    }catch(error){
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
    
}