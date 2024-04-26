console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
let breedsObj = {};
let breedFilter = "";

document.addEventListener("DOMContentLoaded", () => {
    const sel = document.getElementById("breed-dropdown");
    fetch(imgUrl).then((resp) => resp.json()).then((data) => {dogToDOM(data)});
    fetch(breedUrl).then((resp) => resp.json()).then((data) => {
        breedsToDOM(data);
        const sel = document.getElementById("breed-dropdown");
        sel.addEventListener("change", filterBreeds);
    
    });

})

function dogToDOM(dogs){
    dogs.message.forEach(element => {
        const imgTag = document.createElement("img");
        const imgContainer = document.getElementById("dog-image-container");
        imgTag.src = element;
        imgContainer.appendChild(imgTag);
    
        
    });


}function breedsToDOM(breeds){

    //console.log(breeds.message)
    for(let key in breeds.message){
        breedsObj[`${key}`] = [];
        const breedTag = document.createElement("li");
        const breedContainer = document.getElementById("dog-breeds");
        const t = document.createTextNode(key);
        breedTag.appendChild(t);
        breedTag.addEventListener("click", (e) => {e.target.style.color = "purple";})
        
        if(breeds.message[`${key}`].length !== 0){
            let subBreeds = breeds.message[`${key}`];
            const subList = document.createElement("ul");
            for(i in subBreeds){
                breedsObj[`${key}`].push(subBreeds[i]);
                const subBreedTag = document.createElement("li");
                
                const t = document.createTextNode(subBreeds[i]);
                subBreedTag.appendChild(t);

                subList.appendChild(subBreedTag);
                


            }
            breedTag.appendChild(subList);
        }
        breedContainer.appendChild(breedTag);
    
    }


}
function filterBreeds(e){
    breedFilter = e.target.value;
    const newBreeds = {...breedsObj};
    const currentList = document.querySelector("ul");
    while (currentList.firstChild) {
        currentList.removeChild(currentList.lastChild);
    }
    for(let key in newBreeds){
        if(key[0] === breedFilter){
            const breedTag = document.createElement("li");
            const breedContainer = document.getElementById("dog-breeds");
            const t = document.createTextNode(key);
            breedTag.appendChild(t);
            breedTag.addEventListener("click", (e) => {e.target.style.color = "purple";})
            
            if(newBreeds[`${key}`].length !== 0){
                let subBreeds = newBreeds[`${key}`];
                const subList = document.createElement("ul");
                for(i in subBreeds){
                    newBreeds[`${key}`].push(subBreeds[i]);
                    const subBreedTag = document.createElement("li");
                    
                    const t = document.createTextNode(subBreeds[i]);
                    subBreedTag.appendChild(t);

                    subList.appendChild(subBreedTag);
                    


                }
                breedTag.appendChild(subList);
            }
            breedContainer.appendChild(breedTag);
        }
    }
    

}
