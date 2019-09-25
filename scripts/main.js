"use strict";

const chuckQuotesForm = document.querySelector('#chuckQuotesForm');
const closeModal = document.querySelector('.modal__close');
const getQuotesButton = document.querySelector('#getMoreQuotes');

closeModal.addEventListener('click', (e) => {
    toggleModal();
})
chuckQuotesForm.addEventListener('submit', (e) => {
    getQuotesButton.classList.add('is-loading');
    e.preventDefault();
    const categoryValue = chuckQuotesForm.querySelector('select').value;
    updateChuckSays(e, categoryValue);
});

// Add an event listener to the button, DON'T FORGET TO PREVENT THE DEFAULT BEHAVIOR!
// Call a function to return a new quote, and update the DOM

function toggleModal() {
    document.querySelector('.wrapper--modal').classList.toggle('open');
}

// Create a function to update the quote text in the DOM
function updateChuckSays(ev, category = 'science') {
    const chuckSays = document.getElementById('chuckSays');
    chuckSays.innerHTML = "loading..."
    toggleModal()
    get(`https://api.chucknorris.io/jokes/random?category=${category}`,
        (json) => {
            chuckSays.innerHTML = json.value;
            getQuotesButton.classList.remove('is-loading');
            // img.src = json.icon_url;
        });
}

function getCategories() {
    const selectWrapper = document.querySelector('#selectWrapper');
    const categoryList = document.createElement('select');
    chuckQuotesForm.append(categoryList);

    get('https://api.chucknorris.io/jokes/categories',
    (res) => {
        res.forEach((category) => {
            const categoryOption = document.createElement('option');
            categoryOption.text = category;
            categoryOption.value = category;
            if (category !== 'explicit') {
                categoryList.append(categoryOption);
            }
        })
    })
    selectWrapper.append(categoryList);
};

(() => {
    getCategories();
    updateChuckSays(null, 'science'); /* init */
})()