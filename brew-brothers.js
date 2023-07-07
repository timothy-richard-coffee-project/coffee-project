import { coffees } from "./coffeelist.js";

// Node variables
const roastToggles = document.querySelectorAll(".selection");
let roastSelection = document.querySelector(".selection.active");
const tbody = document.querySelector("#coffees");
const addCoffee = document.querySelector("#add-coffee");
const searchInput = document.querySelector("#search");
const pageWrapper = document.querySelector(".page-wrapper");
const modalBg = document.querySelector(".modal-bg");
const submitCoffee = document.querySelector("#submit-coffee");
const priceInput = document.querySelector("#price");
const coffeeForm = document.querySelector("#coffee-form");

// function definition: takes a coffee object and returns an html string
function renderCoffee(coffee) {
    let coffeeImage;
    switch (coffee.roast.toLowerCase()) {
        case "light":
            coffeeImage = "images/light-roast.jpeg";
            break;
        case "medium":
            coffeeImage = "images/medium-roast.jpeg";
            break;
        case "dark":
            coffeeImage = "images/dark-roast.webp";
            break;
        default:
            coffeeImage = "https://via.placeholder.com/84x70?";
    }
    let coffeePrice = coffee.price ? coffee.price : 5;
    // if coffee price ends with .00, remove it
    if (coffeePrice.toString().endsWith(".00")) {
        coffeePrice = coffeePrice.slice(0, -3);
    }
    const coffeeDesc = coffee.description
        ? coffee.description
        : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";
    let html = `
        <div class="coffee-card fade-out">
            <div class="column shrink">
                <div class="img-wrapper">
                    <img src="${coffeeImage}" alt="Coffee image">
                </div>
            </div>
            <div class="column justify-center">
                <div class="row no-gap align-bottom">
                    <div class="column shrink no-wrap">
                        <h3 class="coffee-name">${coffee.name}</h3>
                    </div>
                    <div class="column dotted"></div>
                    <div class="column shrink">
                        <h3 class="coffee-price">$${coffeePrice}</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="column">
                        <p class="coffee-roast">${coffee.roast}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="column">
                        <p class="coffee-description">${coffeeDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    return html;
}

// function definition: takes an array of coffee objects and returns an html string
function renderCoffees(coffees) {
    let html = "";
    for (let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// function definition: updates the coffees displayed on the page
function updateCoffees() {
    let selectedRoast = roastSelection.innerText.toLowerCase();
    let filteredCoffees = coffees;
    if (selectedRoast !== "all") {
        filteredCoffees = coffees.filter(coffee => coffee.roast === selectedRoast);
    }
    if (searchInput.value) {
        filteredCoffees = filteredCoffees.filter(coffee => {
            const coffeeName = coffee.name.toLowerCase();
            const searchValue = searchInput.value.toLowerCase();
            return coffeeName.includes(searchValue);
        });
    }
    // alphabetically sort coffees by coffee.name
    filteredCoffees.sort((a, b) => {
        const coffeeA = a.name.toLowerCase();
        const coffeeB = b.name.toLowerCase();
        if (coffeeA < coffeeB) {
            return 1;
        }
        if (coffeeA > coffeeB) {
            return -1;
        }
        return 0;
    });
    // insert html string into tbody
    tbody.innerHTML = renderCoffees(filteredCoffees);
    // wait for DOM to update, then fade in coffee cards with css transition
    requestAnimationFrame(function () {
        const coffeeCards = document.querySelectorAll(".coffee-card");
        coffeeCards.forEach(function (card) {
            card.classList.remove("fade-out");
        });
    });
}

// function definition: updates the roast selection in the view and calls updateCoffees()
function updateRoastSelection(e) {
    roastSelection.classList.remove("active");
    roastSelection = e.target;
    roastSelection.classList.add("active");
    const coffeeCards = document.querySelectorAll(".coffee-card");
    // fade out all coffee cards, THEN update coffees, THEN fade in all coffee cards
    coffeeCards.forEach(function (card) {
        card.classList.add("fade-out");
    });
    setTimeout(function () {
        updateCoffees();
    }, 200);
}


// IIFE that runs when page loads
// IIFE = Immediately Invoked Function Expression
/* IIFE's are used to represent the main controller for a page and to prevent
    variables from cluttering the global namespace
*/
(()=>{

    // initial render of coffee cards
    updateCoffees(coffees);

    // event listeners for roast selection
    roastToggles.forEach(function (toggle) {
        toggle.addEventListener("click", updateRoastSelection);
    });

    // event listener for search input
    searchInput.addEventListener("input", updateCoffees);

    // event listeners for modal popup
    addCoffee.addEventListener("click", function (e) {
        e.preventDefault();
        pageWrapper.classList.toggle("modal-open");
    });

    // event listeners for modal close
    modalBg.addEventListener("click", function (e) {
        e.preventDefault();
        pageWrapper.classList.toggle("modal-open");
    });

    // event listener for submitting a new coffee
    submitCoffee.addEventListener("click", function (e) {
        // prevent form from submitting, but still validate
        e.preventDefault();
        // get form data
        let coffeeFormData = new FormData(coffeeForm);
        // create coffee object from form data
        let coffee = {};
        coffee.name = coffeeFormData.get("name");
        if (!coffee.name) {
            alert("Please enter a coffee name");
            return;
        }
        coffee.roast = coffeeFormData.get("roast");
        if (!coffee.roast) {
            alert("Please select a roast");
            return;
        }
        coffee.price = coffeeFormData.get("price").replace("$", "");
        if (!coffee.price) {
            alert("Please enter a price");
            return;
        }
        coffee.description = coffeeFormData.get("description");
        coffees.push(coffee);
        updateCoffees();
        coffeeForm.reset();

        pageWrapper.classList.toggle("modal-open");
    });

    // event listener for price input to add currency mask
    var currencyMask = IMask(priceInput, {
        mask: [
            { mask: "" },
            {
                mask: "$num",
                lazy: false,
                blocks: {
                    num: {
                        mask: Number,
                        scale: 2,
                        thousandsSeparator: ",",
                        padFractionalZeros: true,
                        radix: ".",
                        mapToRadix: ["."],
                    },
                },
            },
        ],
    });

})();