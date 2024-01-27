"use strict"

// let windowWidth = innerWidth;
// console.log(`ширина в'юпорта: ${windowWidth}`);

// let windowHeight = window.innerHeight;
// console.log(`висота в'юпорта: ${windowHeight}`);

// // console.log(window);

// console.log(navigator.userAgent);

// if (navigator.userAgent.includes('Chrome')) {
// 	console.log('Браузер: Chrome')
// } else if (navigator.userAgent.includes('Safari')) {
// 	console.log('Браузер: Safari')
// }

// // const os = navigator.userAgentData.platform;
// // console.log(os);

// const address = location.href;
// console.log(address);

// alert('massage');
// let question = confirm('do you love my website?');
// console.log(question);
// prompt('what are you comments?');

// let htmlElement = document.documentElement;
// console.log(htmlElement);

// let headElement = document.head;
// console.log(headElement);

// let bodyElement = document.body;
// console.log(bodyElement);

// let link = document.querySelectorAll('.page__link');
// console.log(link);

// let list = document.querySelector('.page__list');
// console.log(list);

// console.log(document.querySelector('ul').parentElement);

// console.log(document.querySelector('ul').closest('.page'));

// let div = document.createElement('div');
// let pageElement = document.querySelector('.page');
// // pageElement.append(div);

// pageElement.insertAdjacentHTML("afterbegin", `
// <ul class="list">
// 	<li class="item">item #1</li>
// 	<li class="item">item #2</li>
// 	<li class="item">item #3</li>
// 	<li class="item">item #4</li>
// </ul>
// `);

// let pageList = document.querySelector('.page__list');
// console.log(pageList);

// let anyblock = pageList.cloneNode(true);
// console.log(anyblock);

// anyblock.remove();
// console.log(anyblock);

// let pageList = document.querySelector('.page__list');
// console.log(pageList);

// // console.log(getComputedStyle(pageList));

// pageList.classList.add('list--grey')

// pageList.style.border = '1px solid red';
// pageList.style.backgroundColor = '#555555';

// let blockStyle = getComputedStyle(pageList);
// let bgColor = blockStyle.backgroundColor;
// console.log(bgColor);




// ====================================================

// Задача №1
// Отримати в константу елемент <body>

// const bodyElement = document.body;
// console.log(bodyElement);

// ----------------------------------------------------

// Задача №2
/* Написати функцію, яка додає в <body> список UL
з певною кількістю LI (кількість має передаватись як параметр функції, також мати значення за замовченням) */

// function addUlToBody(item = 3) {
// 	const bodyElement = document.body;
// 	let itemList = '';

// 	for (let i = 0; i < item; ++i) {
// 		itemList += '<li></li>'
// 	};

// 	bodyElement.insertAdjacentHTML("afterbegin", `
// 		<ul>${itemList}</ul>
// 	`);
// }

// addUlToBody(6);

// ----------------------------------------------------

// Задача №3
/* Додати до елементу <body> класс loaded.
Потім перевірити чи є клас loaded у елемента <body>
і, якщо є, додати стиль кольору тесту зелений. */

// const bodyElement = document.body;
// bodyElement.classList.add('loaded');

// if (bodyElement.classList.contains('loaded')) {
// 	bodyElement.style.color = 'green';
// }

// ----------------------------------------------------

// Задача №4
/* Дано в html: три елементи з класом item.
Треба отримати ці елементи в константу, кожному додати клас active,
та перезаписати контент всередені кожного елемента на "Елемент №(тут порядковий номер елементу починаючи з 1)". */

// const listItems = document.querySelectorAll('.item');

// if (listItems.length) {
// 	listItems.forEach((item, index) => {
// 		item.classList.add('active');
// 		item.textContent = `Елемент №${index + 1}`;
// 	});
// };

// ----------------------------------------------------

// Задача №5
/* Дано в html: текст, далі кнопка з класом button.
Треба прокрутити скрол сторінки до кнопки */

// const button = document.querySelector('.button');

// if (button) {
// 	button.scrollIntoView({
// 		block: 'center',
// 		inline: 'nearest',
// 		behavior: 'smooth'
// 	});
// };

// ----------------------------------------------------

// Задача №6
/* Дано в html: посилання з класом link
Треба додати до посилання дата атрибут зі значенням 100
Поім отримати значення aтрибуту, та, якщо значення меньше 200
пофарбувати колір тексту посилання в червоний */

const links = document.querySelectorAll('.link');

if (links.length) {
	links.forEach(link => {
		if (link.dataset.index < 200) {
			link.style.color = 'red';
		};
	});
};

// ----------------------------------------------------