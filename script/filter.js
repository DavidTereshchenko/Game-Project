document.querySelector('.filter__icon').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('.filter__checkbox').classList.toggle('list');
    document.querySelector('.filter__container').classList.toggle('open');
});
