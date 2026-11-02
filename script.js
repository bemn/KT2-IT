const cardTemplate = document.getElementById('card-template'); 
const cardsContainer = document.querySelector('.cards'); 
const searchInput = document.querySelector('.search_input'); 
const categoryBtns = document.querySelectorAll('.category-btn');

async function getUsersListApi() {
    const response = await fetch('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all'); 
    const users = await response.json(); 
    return users.items;
}

function renderPersonal(personal) {
    const clone = cardTemplate.content.cloneNode(true).querySelector('.card');            
    const cardTitle = clone.querySelector('.card_title');                                        
    cardTitle.querySelector('h3').textContent = `${personal.firstName} ${personal.lastName}`; //установка текста заголовка карточки в формате "Имя Фамилия"
    cardTitle.querySelector('span').textContent = `${personal.userTag}`; 
    clone.querySelector('p').textContent = `${personal.position}`;
    cardsContainer.appendChild(clone);
}

async function handleSearch(event) {
    const inputValue = event.target.value.toLowerCase();
    const users = await getUsersListApi()
    const filteredPersonals = users.filter(personal => personal.firstName.toLowerCase().includes(inputValue) || personal.lastName.toLowerCase().includes(inputValue) || personal.userTag.toLowerCase().includes(inputValue));
    cardsContainer.innerHTML = '';
    filteredPersonals.forEach(renderPersonal);
}

async function handleClickCategory(event) {
    const category = event.target.dataset.category;
    const response = await fetch(`https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${category}&__dynamic=true`); 
    const users = await response.json();
    cardsContainer.innerHTML = '';
    users.items.forEach(renderPersonal);
}

searchInput.addEventListener('input', handleSearch); 

categoryBtns.forEach(btn => {
    btn.addEventListener('click', handleClickCategory);
});

async function init() {
    const users = await getUsersListApi(); 
    users.forEach(renderPersonal); 
}

init(); 