//Define UI vars
const form = document.querySelector('.guest-form');
const guestList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-guests');
const filterInput = document.querySelector('#filter');
const inputGuests = document.querySelector('#new-guest');


//Load all event listeners
loadEventListeners();


//Initialize loadEventListeners
function loadEventListeners() {
    //Retrieve guests from LS
    document.addEventListener('DOMContentLoaded', retrieveFromLocalStorage());
    //Add guest event
    form.addEventListener('submit', addGuest);
    //Remove guest
    guestList.addEventListener('click', removeGuest);
    //Clear all guests
    clearButton.addEventListener('click', clearGuests);
    //Filter names
    filterInput.addEventListener('keyup', filterGuests);
}

//Initialize addGuest function
function addGuest(e){
    if (inputGuests.value === '') {
        alert('Type a valid guest name');
    } else {

        //Create li element
        const li = document.createElement('li');
        //Add class to li
        li.classList.add('collection-item');
        //Create a text node
        li.appendChild(document.createTextNode(inputGuests.value));
        //Create a link
        const link = document.createElement('a');
        //Add class to link
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append link into li
        li.appendChild(link);
        //Append li to guestList
        guestList.appendChild(li);

        //Store in Local Storage
        storeInLocalStorage(inputGuests.value);

        //Clear input
        inputGuests.value = '';
    }
    
    e.preventDefault();
}

function removeGuest(e){
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Delete a guest?')){
            e.target.parentElement.parentElement.remove();

            // Remove a single guest from local storage
            removeSingleLocalStorage(e.target.parentElement.parentElement);
            
        }

        e.preventDefault();
    }
}

function clearGuests(e){
    if (confirm('Are you sure you want to clear all guests?')) {
        while(guestList.firstChild) {
            guestList.removeChild(guestList.firstChild);

            removeAllGuestsFromLS();
        }
    }
}

function filterGuests(e) {
    let text = e.target.value.toLowerCase();
    
    const lis = document.querySelectorAll('.collection-item');

    lis.forEach(function(li){
        const item = li.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1){
            li.style.display = 'block';
        } else {
            li.style.display = 'none';
        }
    })
}

function storeInLocalStorage(guest){
    let guests;

    //Check if local storage is empty else get local storage
    if (localStorage.getItem('guests') === null) {
        guests = [];
    } else {
        guests = JSON.parse(localStorage.getItem('guests'));
    }
    //Add guest into local array guests
    guests.push(guest);

    localStorage.setItem('guests', JSON.stringify(guests));
}

function retrieveFromLocalStorage(){
    let guests;

    //Check if local storage is empty else get local storage
    if (localStorage.getItem('guests')===null) {
        guests = [];
    } else {
        guests = JSON.parse(localStorage.getItem('guests'));
    }

    guests.forEach(function(guest) {
        //Create li element
        const li = document.createElement('li');
        //Add class to li
        li.classList.add('collection-item');
        //Create a text node
        li.appendChild(document.createTextNode(guest));
        //Create a link
        const link = document.createElement('a');
        //Add class to link
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append link into li
        li.appendChild(link);
        //Append li to guestList
        guestList.appendChild(li);
    })
}

function removeSingleLocalStorage(li) {
    guestItem = li.firstChild.textContent;

    let guests;

    //Check if local storage is empty else get local storage
    if (localStorage.getItem('guests')===null) {
        guests = [];
    } else {
        guests = JSON.parse(localStorage.getItem('guests'));
    }

    //Removes ALL guests in LS with the same name
    guests.forEach(function(guest, index) {
        if(guest === guestItem) {
            guests.splice(index, 1);
        }
    })

    localStorage.setItem('guests', JSON.stringify(guests));
}

function removeAllGuestsFromLS() {
    localStorage.clear('guests');
}