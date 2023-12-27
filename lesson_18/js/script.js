// BURGER MENU
const icon = document.querySelector('.icon-menu');

icon.addEventListener('click', function () {
	document.documentElement.classList.toggle('menu-open');
});

// SPOILER
const spoiler = document.querySelectorAll('.menu__item');

spoiler.forEach(function (item) {
	item.addEventListener("click", spoilerClick);
});

function spoilerClick() {
	this.classList.toggle('spoiler-open');
}