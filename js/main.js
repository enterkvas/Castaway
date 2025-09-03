const menu = document.querySelector('.menu__body'),
	iconMenu = document.querySelector('.menu__icon'),
	body = document.body;
if(menu && iconMenu) {
	iconMenu.addEventListener('click', () => {
		menu.classList.toggle('_active');
		iconMenu.classList.toggle('_active');
		body.classList.toggle('_lock');
	})
}

menu.querySelectorAll('.menu__link').forEach(link => {
	link.addEventListener('click', () => {
		menu.classList.remove('_active');
		iconMenu.classList.remove('_active');
		body.classList.remove('_lock');
	})
})