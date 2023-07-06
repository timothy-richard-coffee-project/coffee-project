"use strict"


let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let coffeeForm = document.querySelector('#coffee-form');
let coffeeSearch = document.querySelector('#searchBox')
let coffeeAdd = document.querySelector('#button-addon2')

function renderCoffee(coffee) {
    let html = '<div class="col-4 mt-5">'
    // html += '<td>' + coffee.id + '</td>';
    if (coffee.roast === 'light') {
        html += '<img class="coffee-beans" src="img/download.jpeg" alt="light coffee">'
    }
    if (coffee.roast === 'medium') {
        html += '<img class="coffee-beans" src="img/IMG_2397.jpeg" alt=medium coffee">'
    }
    if (coffee.roast === 'dark') {
        html += '<img class="coffee-beans" src="img/download%20(1).jpeg" alt=dark coffee">'
    }
    html += '<div class="d-flex">';
    html += '<h2 class="text-light">' + coffee.name + '</h2>';
    html += '<p class="align-items-center text-light">' + coffee.roast + '</p>';
    html += '</div>';
    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for (let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(event) {
    event.preventDefault();
    const searchedCoffee = coffeeSearch.value.toLowerCase()
    const selectedRoast = roastSelection.value.toLowerCase();
    const searchValue = coffeeSearch.value.toLowerCase();
    let filteredCoffees = coffees;
    if (selectedRoast !== 'all') {
        filteredCoffees = filteredCoffees.filter(function(coffee){
            return coffee.roast.toLowerCase() === selectedRoast;
        });
    }
    if (coffeeSearch !== '') {
        filteredCoffees = filteredCoffees.filter(function(coffee){
            return coffee.name.toLowerCase().includes(searchValue)
        });
    }

    if (filteredCoffees.length === 0) {
        tbody.innerHTML = `<h3>No coffees were found</h3>`;
    } else {
        tbody.innerHTML = renderCoffees(filteredCoffees);
    }
}

function addCoffee(event) {
    event.preventDefault();
    let newCoffee = {};
    newCoffee.id = coffees.length + 1;
    newCoffee.name = document.getElementById('addCoffee').value;
    newCoffee.roast = document.getElementById('roast-selection-new').value;
    console.log(newCoffee);
    coffees.push(newCoffee)
    tbody.innerHTML = renderCoffees(coffees)
}

// function searchCoffee(event) {
//     event.preventDefault(); // Prevent form submission
//     const searchedCoffee = coffeeSearch.value.toLowerCase()
//     const coffeeSearch = []
//     coffees.forEach(function(coffee) {
//         if (coffee.name.toLowerCase() === searchedCoffee.toLowerCase()) {
//             coffeeSearch.push(coffee);
//         }
//     });
//     tbody.innerHTML = renderCoffees(coffeeSearch);
//
// }

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

tbody.innerHTML = renderCoffees(coffees);

coffeeSearch.addEventListener('input', updateCoffees);
// coffeeForm.addEventListener('submit', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
coffeeAdd.addEventListener('click', addCoffee)

let userEmail = prompt('Sign Up For Our Rewards and Get Brew Brother Bucks with Every Purchase!             Email :')

if (userEmail != null) {
    alert('Thanks For Signing Up Check Your Email For Conformation')
} else {
    alert('Maybe next time :)')
}