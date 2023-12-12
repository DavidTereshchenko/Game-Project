const operator = document.querySelector('[data-operation]');
const btn = document.querySelector('[data-button]');
const visualNumberTwo = document.querySelector('[data-number-two]');
const visualOperator = document.querySelector('[data-operation-visual]');
const visualNumberOne = document.querySelector('[data-number-one]');
const equals = document.querySelector('[data-equals]');
const visualResult = document.querySelector('[data-result-visual]');
const countBlock = document.querySelector('[data-count-block]');
const countGame = document.querySelector('[data-count-game]');
const countGamesVisual = document.querySelector('[data-count-game-visual]');
const date = document.querySelector('[data-date]');

btn.onclick = function () {
    const one = Number(document.getElementById('firstNumber').value);
    const two = Number(document.getElementById('secondNumber').value);
    const result = document.querySelector('.result');

    const currentDate = new Date();

    countBlock.style.display = 'flex';

    let calc;

    if (Number.isNaN(one) || Number.isNaN(two)) {
        result.innerText = 'Enter a number';
        visualResult.innerText = 'Enter a number';
        visualOperator.innerText = '';
        visualNumberOne.innerText = '';
        visualNumberTwo.innerText = '';
        equals.innerText = '';
        return result;
    }

    switch (operator.value) {
        case '+':
            calc = one + two;
            break;

        case '-':
            calc = one - two;
            break;

        case '×':
            calc = one * two;
            break;

        case '/':
            if (two === 0) {
                result.innerText = 'Number must not be zero';
                visualResult.innerText = 'ENumber must not be zero';
                visualOperator.innerText = '';
                visualNumberOne.innerText = '';
                visualNumberTwo.innerText = '';
                equals.innerText = '';
                return result;
            }
            calc = one / two;
            break;

        default:
            visualResult.innerText = 'Choose a valid operation';
            visualOperator.innerText = '';
            visualNumberOne.innerText = '';
            visualNumberTwo.innerText = '';
            equals.innerText = '';
            result.innerText = 'Choose a valid operation';
            return result;
    }

    if (calc > 100) {
        result.innerText = 'Result is too big';
        visualResult.innerText = 'Result is too big';
        visualOperator.innerText = '';
        visualNumberOne.innerText = '';
        visualNumberTwo.innerText = '';
        equals.innerText = '';
        countGame.innerText = '';
        countGamesVisual.innerText = '';
        return result;
    }

    function executionTime() { return new Date() - currentDate; }

    function dateNow() {
        const year = currentDate.getFullYear();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
        const day = new Intl.DateTimeFormat('ua-UA', { day: '2-digit' }).format(currentDate);

        return `${day}-${month}-${year}`;
    }
    function hourNow() {
        let hour = currentDate.getHours();
        let minute = currentDate.getMinutes();

        if (hour < 10) {
            hour = `0${hour}`;
        }

        if (minute < 10) {
            minute = `0${minute}`;
        }

        return `${hour}:${minute}`;
    }

    let game = 'Game';

    if (calc > 1) {
        game = 'Games';
    }

    visualNumberOne.innerText = one;
    visualOperator.innerText = operator.value;
    visualNumberTwo.innerText = two;
    equals.innerText = '=';
    visualResult.innerText = calc;
    countGamesVisual.innerText = game;

    result.innerText = calc;
    countGame.innerText = game;

    date.innerText = `Date of calculation: ${dateNow()}, ${hourNow()}. Time of function execution: ${executionTime()} ms`;

    return result;
};
