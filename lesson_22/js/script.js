"use strict"

// BURGER MENU
document.addEventListener('click', documentAction)

function documentAction(e) {
	const targetElement = e.target
	if (targetElement.closest('.icon-menu')) {
		document.documentElement.classList.toggle('menu-open')
	} else if (targetElement.closest('.menu__link')) {
		if (document.documentElement.classList.contains('menu-open')) {
			document.documentElement.classList.remove('menu-open')
		}

		e.preventDefault()
	}
}
// =======================================================


// SPOLLERS
const spoilersArray = document.querySelectorAll('[data-spoilers]');
if (spoilersArray.length) {
	// Отримання звичайних спойлерів
	const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
		return !item.dataset.spoilers.split(",")[0];
	});
	// Ініціалізація звичайних спойлерів
	if (spoilersRegular.length) {
		initSpoilers(spoilersRegular);
	}

	// Отримання спойлерів з медіа запитами
	const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
		return item.dataset.spoilers.split(",")[0];
	});
	// Ініціалізація спойлерів з медіа запитами
	if (spoilersMedia.length) {
		const breakpointsArray = [];
		spoilersMedia.forEach(item => {
			const params = item.dataset.spoilers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Отримуємо унікальні брейкпоінти
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Робота з кожним брейкпоінтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Об'єкти з потрібними умовами
			const spoilersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Подія
			matchMedia.addListener(function () {
				initSpoilers(spoilersArray, matchMedia);
			});
			initSpoilers(spoilersArray, matchMedia);
		});
	}
	// Ініціалізація
	function initSpoilers(spoilersArray, matchMedia = false) {
		spoilersArray.forEach(spoilersBlock => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add('_init');
				initSpoilerBody(spoilersBlock);
				spoilersBlock.addEventListener("click", setSpoilerAction);
			} else {
				spoilersBlock.classList.remove('_init');
				initSpoilerBody(spoilersBlock, false);
				spoilersBlock.removeEventListener("click", setSpoilerAction);
			}
		});
	}
	// Робота з контентом
	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
		const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
		if (spoilerTitles.length > 0) {
			spoilerTitles.forEach(spoilerTitle => {
				if (hideSpoilerBody) {
					spoilerTitle.removeAttribute('tabindex');
					if (!spoilerTitle.classList.contains('_active')) {
						spoilerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spoilerTitle.setAttribute('tabindex', '-1');
					spoilerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpoilerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
			const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
			const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
			const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
			if (!spoilersBlock.querySelectorAll('._slide').length) {
				if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
					hideSpoilersBody(spoilersBlock);
				}
				spoilerTitle.classList.toggle('_active');
				_slideToggle(spoilerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpoilersBody(spoilersBlock) {
		const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
		if (spoilerActiveTitle) {
			spoilerActiveTitle.classList.remove('_active');
			_slideUp(spoilerActiveTitle.nextElementSibling, 500);
		}
	}
}

// SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;

		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		target.style.overflow = 'hidden';
		target.style.height = 0;

		target.offsetHeight;

		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = `${duration}ms`;

		target.style.height = `${height}px`;

		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
/*
Для батьківського блоку спойлерів пишемо атрибут data-spoilers
Для заголовків спойлерів пишемо атрибут data-spoiler
Якщо потрібно включити \ виключити роботу спойлерів на різних розмірах екранів
пишемо параметри ширини і типу брейкпоінта.
Наприклад:
data-spollers="992,max" - спойлери будуть працювати тільки на екранах менше або рівних 992px
data-spollers="768,min" - спойлери будуть працювати тільки на екранах більше або рівних 768px

Якщо потрібно, щоб в блоці відкривався тільки один спойлер додаємо атрибут data-one-spoiler
*/
// =======================================================

const root = document.querySelector(":root");

// let option = {
// 	root: null,
// 	rootMargin: "0px 0px 0px 0px",
// 	threshold: 0.5,
// };

let callback = (entries, observer) => {
	entries.forEach(entry => {

		if (entry.isIntersecting) {
			entry.target.classList.add("animate");

			animateProgressIcon(entry.target)
		} else {
			entry.target.classList.remove("animate");
		}
	});
};

// let observer = new IntersectionObserver(callback, option);

// document.querySelectorAll('.card-stats__icon').forEach(card => {
// 	observer.observe(card);
// });


function getStyleValue(element, property) {
	if (element instanceof Element && typeof property === 'string') {
		const style = window.getComputedStyle(element)
		return style.getPropertyValue(property)
	} else {
		return null
	}
}

function animateProgressIcon(element) {
	if (element) {
		const value = parseInt(element.dataset.stats)
		const delay = parseInt(element.dataset.delay)
		let counter = 0
		const children = element.children
		let valueElement
		let progressElement

		if (children.length) {
			for (let i = 0; i < children.length; i++) {
				switch (true) {
					case children[i].classList.contains('card-stats__value'):
						valueElement = children[i]
						break;

					case children[i].classList.contains('card-stats__progress'):
						progressElement = children[i]
						break;

					default:
						break;
				}
			}
		}

		const dashoffsetStart = parseInt(getStyleValue(progressElement, 'stroke-dashoffset'));
		const dashoffsetEnd = dashoffsetStart - dashoffsetStart / 100 * value;
		const duration = delay * value / 1000 + 's'

		root.style.setProperty('--dashoffset', dashoffsetEnd);
		root.style.setProperty('--duration', duration);

		setInterval(() => {
			if (counter == value) {
				clearInterval;
			} else {
				counter++;
				valueElement.textContent = `${counter}%`;
			}
		}, delay);
	}
}


// COUNTER

function counterInit(elements) {
	let counters = elements ? elements : document.querySelectorAll('[data-counter]')

	if (counters) {
		counters.forEach(counter => {
			const duration = parseInt(counter.dataset.counter) ? parseInt(counter.dataset.counter) : 1000
			const digitsCounter = counter.querySelector('[data-digits-counter]')
			const svgCounter = counter.querySelector('[data-svg-counter]')

			if (svgCounter) {
				const svgRadius = svgCounter.querySelector('circle').r.baseVal.value
				let circumference = Math.round(2 * Math.PI * svgRadius)
				svgCounter.style.strokeDasharray = circumference
				svgCounter.style.strokeDashoffset = circumference
				svgCounter.style.transitionProperty = 'stroke-dashoffset'
				svgCounter.style.transitionDuration = duration + 'ms'
			}

			if (digitsCounter) {
				const value = parseInt(digitsCounter.innerHTML)
				digitsCountersAnimate(digitsCounter, duration)
				svgCountersAnimate(svgCounter, value)
			}
		})
	}

}

counterInit()


// Функція ініціалізації
// function digitsCountersInit(elements) {
// 	let digitsCounters = elements ? elements : document.querySelectorAll('[data-digits-counter]')

// 	if (digitsCounters) {
// 		digitsCounters.forEach(digitsCounter => {
// 			digitsCountersAnimate(digitsCounter)
// 		})
// 	}
// }

// Функція аніміції цифер лічильника
function digitsCountersAnimate(element, duration) {
	let startTimestamp = null
	duration ? duration : 1000
	const startValue = parseInt(element.innerHTML)
	const startPosition = 0

	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp
		const progress = Math.min((timestamp - startTimestamp) / duration, 1)
		element.innerHTML = Math.floor(progress * (startPosition + startValue))
		if (progress < 1) {
			window.requestAnimationFrame(step)
		}
	}

	window.requestAnimationFrame(step)
}

// Функція аніміції svg іконки лічильника
function svgCountersAnimate(element, value) {
	if (!element.classList.contains('_animate')) {
		element.classList.add('_animate')
		const dashoffsetStart = parseInt(getStyleValue(element, 'stroke-dashoffset'))
		const dashoffsetEnd = Math.round(dashoffsetStart - dashoffsetStart / 100 * 95)
		element.style.strokeDashoffset = dashoffsetEnd
	} else {
		element.classList.remove('_animate')
	}
}

svgCountersAnimate(document.querySelector('[data-svg-counter]'))

// function svgProgressInit(elements) {
// 	let svgProgress = elements ? elements : document.querySelectorAll('[data-progress]')

// 	if (svgProgress) {
// 		svgProgress.forEach(item => {
// 			svgProgressAnimate(item)
// 		})
// 	}
// }

// function svgProgressAnimate(element) {
// 	const duration = parseInt(element.dataset.digitsCounter) ? parseInt(element.dataset.digitsCounter) : 1000
// }

let option = {
	root: null,
	rootMargin: "0px 0px 0px 0px",
	threshold: 0.5,
};

// let observer = new IntersectionObserver((entries, observer) => {
// 	entries.forEach(entry => {
// 		if (entry.isIntersecting) {
// 			const targetElement = entry.target
// 			const digitsCountersItems = targetElement.querySelectorAll('[data-digits-counter]')
// 			if (digitsCountersItems.length) {
// 				digitsCountersInit(digitsCountersItems)
// 			}

// 			observer.unobserve(targetElement)
// 		}
// 	})
// }, option)

// let cardsStats = document.querySelectorAll('.card-stats')
// if (cardsStats.length) {
// 	cardsStats.forEach(card => {
// 		observer.observe(card)
// 	})
// }

// =======================================================


// SLIDE

const brandsItems = document.querySelector('.brands__items').cloneNode(true)
document.querySelector('.brands__body').append(brandsItems)