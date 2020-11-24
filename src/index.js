document.addEventListener("DOMContentLoaded", ()=> {
    fetchAllDogs()
    const filterButton = document.getElementById("good-dog-filter")
    filterButton.addEventListener("click", filterDogs)
})

function fetchAllDogs() {
    fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(json => {
            displayDogs(json)
        })
}

function displayDogs(dogs) {
    dogs.forEach(dog => {
        addDog(dog)
    })
}

function addDog(dog) {
    const dogContainer = document.getElementById("dog-bar")
    const span = document.createElement("span")
    span.innerText = dog.name
    span.addEventListener("click", () => showInfo(dog))
    dogContainer.appendChild(span)
    
}

function showInfo(dog) {
    const info = document.getElementById("dog-info")
    info.innerText = ""
    const image = document.createElement("img")
    const header = document.createElement("h2")
    const button = document.createElement("button")
    button.addEventListener("click", (e) => changeStatus(e,dog))
    image.src = dog.image
    header.innerText = dog.name
    if(dog.isGoodDog) {
        button.innerText = "Good Dog!"
    } else {
        button.innerText = "Bad Dog!"
    }
    info.append(image,header,button)
}

function changeStatus(e,dog) {
    let dogStatus = ""
    if (e.target.textContent == "Good Dog!") {
        e.target.textContent = "Bad Dog!"
        dogStatus = false
    } else {
        e.target.textContent = "Good Dog!"
        dogStatus = true
    }
    fetch("http://localhost:3000/pups/" + `${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: dogStatus
        })
    })
        .then(resp => resp.json())
        .then(json => console.log(json))
}

function filterDogs(e) {
    const dogContainer = document.getElementById("dog-bar")
    if (e.target.innerText == "Filter good dogs: OFF") {
        e.target.innerText = "Filter good dogs: ON"
        dogContainer.innerText = ''
        console.log(e.target.innerText)
        showGoodDogs()
    } else {
        e.target.innerText = "Filter good dogs: OFF"
        dogContainer.innerText = ''
        fetchAllDogs()
    }
}

function showGoodDogs() {
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => {
        const goodDogs = json.filter(dog => dog.isGoodDog == true)
        displayDogs(goodDogs)
    })
}