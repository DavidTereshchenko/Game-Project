let games = [];
const cardsBlock = document.querySelector('.game__item-blocks');
const searchInput = document.querySelector('.search__input');
const newCheck = document.querySelector('#newGames');
const oldCheck = document.querySelector('#oldGames');
const oldSort = document.querySelector('[data-radio="old"]');
const newSort = document.querySelector('[data-radio="new"]');
const dateYear = '2020-01-01';
const loading = document.querySelector('[data-type="loading"]');
const genreSelect = document.querySelector('[data-select="genre"]').value;
const platformSelect = document.querySelector('[data-select="platform"]').value;

function showLoader() {
    loading.style.display = 'flex';
}

function hideLoader() {
    loading.style.display = 'none';
}

function createCard(cards) {
    cards.forEach((el) => {
        cardsBlock.insertAdjacentHTML('beforeend', `<div class="item-block__game-item ">
                                <div class="game-item-item__header">
                                    <div class="header__icon">
                                        <img src="${el.thumbnail}" class="header__img" alt="game icon" width="90" height="90">
                                    </div>
                                    <div class="header__about">
                                        <h2 class="header__game-name cards-title">${el.title}</h2>
                                        <div class="about__p">${el.short_description}</div>
                                    </div>
                                </div>
                                <div class="game-item__info-list">
                                    <ul class="info-game" data-info="info">
                                        <li>
                                            <b>Genre:</b>${el.genre}
                                        </li>
                                        <li>
                                            <b>Platform:</b>${el.platform}
                                        </li>
                                        <li>
                                            <b>Publisher:</b>${el.publisher}
                                        </li>
                                        <li>
                                            <b>Developer:</b>${el.developer}
                                        </li>
                                        <li>
                                            <b>Release_date:</b>${el.release_date}
                                        </li>
                                    </ul>
                                </div>
                            </div>`)
    })
}

async function getGames() {
    try {
        showLoader();
        const response = await fetch('https://mmo-games.p.rapidapi.com/games', {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'X-RapidAPI-Key': '1c3169c707mshb51bff34cbc9ff6p1749b9jsn648a19134256',
                'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
            },
        });
        games = await response.json();
        games = games.slice(0, 50);
        createCard(games);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoader();
    }
}
document.addEventListener('DOMContentLoaded', getGames);

document.querySelector('[data-search]').addEventListener('click', () => {
    showLoader();
    const search = games.filter((el) => {
        const searchThem = searchInput.value.toLowerCase();
        return el.title.toLowerCase().includes(searchThem)
            || el.short_description.toLowerCase().includes(searchThem)
            || el.genre.toLowerCase().includes(searchThem)
            || el.platform.toLowerCase().includes(searchThem)
            || el.publisher.toLowerCase().includes(searchThem)
            || el.developer.toLowerCase().includes(searchThem);
    });
    cardsBlock.innerText = '';
    setTimeout(() => {
        hideLoader();
        createCard(search);
    }, 500);
});

searchInput.oninput = function () {
    showLoader();
    newCheck.checked = false;
    oldCheck.checked = false;
    if (!this.value.length) {
        cardsBlock.innerText = '';
        setTimeout(() => {
            hideLoader();
            createCard(games)
        }, 500);
    }
};

function sortCards(element) {
    showLoader()
    const sort = games.sort((el) => {
        if (element.dataset.check === 'Old First') {
            el.release_date;
        }
    })

    setTimeout(() => {
        sort.forEach((cards) => {
            createCard(cards);
        });
    });
}

function checkBoxFilter(element) {
    showLoader();
    const filterCards = games.filter((el) => {
        searchInput.value = '';
        if (newCheck.checked === true && oldCheck.checked === true) {
            return element;
        }

        if (newCheck.checked === false && oldCheck.checked === false) {
            return element;
        }

        if (element.dataset.check === 'new' && newCheck.checked === true) {
            return el.release_date >= dateYear;
        } if (oldCheck.checked === true) {
            return el.release_date <= dateYear;
        }

        if (element.dataset.check === 'old' && oldCheck.checked === true) {
            return el.release_date <= dateYear;
        } if (newCheck.checked === true) {
            return el.release_date >= dateYear;
        }
        return false;
    });
    cardsBlock.innerText = '';

    setTimeout(() => {
        hideLoader();
        createCard(filterCards)
    }, 500);
}

checkBoxFilter(dateYear);
