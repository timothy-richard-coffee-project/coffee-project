"use strict"

let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let coffeeForm = document.querySelector('#coffee-form');
let coffeeSearch = document.querySelector('#searchBox')

function renderCoffee(coffee) {
    let html = '<tr class="coffee">';
    html += '<td>' + coffee.id + '</td>';
    html += '<td>' + coffee.name + '</td>';
    html += '<td>' + coffee.roast + '</td>';
    html += '</tr>';
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

