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


function getStyleValue(element, property) {
	if (element instanceof Element && typeof property === 'string') {
		const style = window.getComputedStyle(element)
		return style.getPropertyValue(property)
	} else {
		return null
	}
}
// =======================================================


// COUNTER

// Функція ініціалізації цифрового лічильника
function digitsCountersInit(elements) {
	// Перевірка на наявність елемента
	let digitsCounters = elements ? elements : document.querySelectorAll('[data-digits-counter]')

	if (digitsCounters.length) {
		digitsCounters.forEach(digitsCounter => {
			digitsCountersAnimate(digitsCounter)
		})
	}
}

function easeOutQuad(num) {
	return 1 - Math.pow(1 - num, 2)
}

// Функція аніміції цифер лічильника
function digitsCountersAnimate(element) {
	let startTimestamp = null
	const duration = parseInt(element.dataset.digitsCounter) ? parseInt(element.dataset.digitsCounter) : 1000
	const startValue = parseInt(element.innerHTML)
	const startPosition = 0

	const parent = element.parentElement
	const svgIcon = parent.querySelector('[data-svg-counter]')
	if (svgIcon) {
		if (svgIcon.dataset.svgCounter == 'circle') {
			svgCounterInit(svgIcon, startValue, duration)
		}
	}

	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp
		const progress = Math.min((timestamp - startTimestamp) / duration, 1)
		element.innerHTML = Math.floor(easeOutQuad(progress) * (startPosition + startValue))
		if (progress < 1) {
			window.requestAnimationFrame(step)
		}
	}

	window.requestAnimationFrame(step)
}

// Функція ініціалізації svg-іконки цифрового лічильника
function svgCounterInit(element, percent, duration) {
	const svgCounter = element ? element : document.querySelector('[data-svg-counter]')

	if (svgCounter) {
		svgCircleAnimate(svgCounter, percent, duration)
	}
}

// Функція аніміції svg-circle іконки
function svgCircleAnimate(element, percent, duration) {
	const svgRadius = element.querySelector('circle').r.baseVal.value
	const circumference = Math.round(2 * Math.PI * svgRadius)
	const endPosition = Math.round(circumference / 100 * percent)
	let startTimestamp = null

	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp
		const progress = Math.min((timestamp - startTimestamp) / duration, 1)
		element.style.strokeDasharray = circumference
		element.style.strokeDashoffset = Math.floor(circumference - easeOutQuad(progress) * endPosition)
		if (progress < 1) {
			requestAnimationFrame(step)
		}
	}

	requestAnimationFrame(step)
}


let option = {
	root: null,
	rootMargin: "0px 0px 0px 0px",
	threshold: 0.5,
};

let observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const targetElement = entry.target
			const digitsCountersItems = targetElement.querySelectorAll('[data-digits-counter]')
			if (digitsCountersItems.length) {
				digitsCountersInit(digitsCountersItems)
			}

			observer.unobserve(targetElement)
		}
	})
}, option)

let cardsStats = document.querySelectorAll('.card-stats')
if (cardsStats.length) {
	cardsStats.forEach(card => {
		observer.observe(card)
	})
}

// =======================================================


// SLIDE
const sliderItems = document.querySelectorAll('.slider__items')
sliderItems.forEach(item => {
	item.parentElement.append(item.cloneNode(true))
})

// =======================================================


// RATING
const ratings = document.querySelectorAll('[data-rating]')

ratings.forEach(rating => {
	const ratingItems = rating.querySelectorAll('.rating__item')
	const ratingValue = rating.dataset.rating
	const valueFull = parseInt(ratingValue)
	const valuePart = (ratingValue - valueFull) * 100

	for (let i = 0; i < valueFull; i++) {
		ratingItems[i].classList.add('_full')
	}

	if (valuePart > 0) {
		ratingItems[valueFull].classList.add('_part')
		const itemPart = document.createElement('span')
		itemPart.style.width = valuePart + '%'
		ratingItems[valueFull].prepend(itemPart)
	}
})
