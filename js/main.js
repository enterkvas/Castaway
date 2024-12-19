const menu = document.querySelector('.menu__body'),
	  menuBtn = document.querySelector('.menu__icon'),
	  body = document.body;
if(menu && menuBtn) {
	menuBtn.addEventListener('click', () => {
		menu.classList.toggle('_active');
		menuBtn.classList.toggle('_active');
		body.classList.toggle('_lock');
	})
}

menu.querySelectorAll('.menu__link').forEach(link => {
	link.addEventListener('click', () => {
		menu.classList.remove('_active');
		menuBtn.classList.remove('_active');
		body.classList.remove('_lock');
	})
})

const anchors = document.querySelectorAll('a[href*="#"]');
anchors.forEach(anchor => {		
	anchor.addEventListener('click', event => {
		event.preventDefault();

		const blockID = anchor.getAttribute('href').substring(1);
		document.getElementById(blockID).scrollIntoView();
		// document.getElementById(blockID).scrollIntoView({
		// 	behavior: 'smooth',
		// 	block: 'start'
		// })
	})
})