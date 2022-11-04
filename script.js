const searchBtn = document.querySelector(".btn");
const retryBtn = document.querySelector(".retryBtn");

const input = document.getElementById("searchInput");
const mainContainer = document.querySelector(".main");
const errorMsg = document.querySelector(".errorMsg")


function getCountry(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function(response){
        console.log(response);
        if(!response.ok){
            throw new Error("Country Not Found. Try again.")
        }
        return response.json()
    })
    .then(function(data){
        console.log(data);
        const html = `<div class="container">
        <img src="${data[0].flags.svg}" alt="">
        <div class="text-box">
            <h2>${data[0].name.common}</h2>
            <p class="capital">Capital: <span>${data[0].capital[0]}</span></p>
            <p class="language">Language: <span>${Object.values(data[0].languages)[0]}</span></p>
            <p class="currencies">Currency:<span> ${Object.values(data[0].currencies)[0].name}</span></p>
            <p class="population">Population: <span>${(data[0].population / 1000000).toFixed(1)}M</span></p>
            <p class="region">Region:<span> ${data[0].region}</span></p>
        </div>
        </div>`

        mainContainer.insertAdjacentHTML("afterbegin", html)
        input.remove();
        searchBtn.remove();
        retryBtn.style.display = "inline-block"
        errorMsg.remove();

    })
    .catch(function(err){
        errorMsg.innerHTML = err.message;
    })
}

searchBtn.addEventListener("click", function(){
    const inputValue = input.value;
    input.value = ""   
    getCountry(inputValue);
});

retryBtn.addEventListener("click", function(){
    document.location.reload();
})



