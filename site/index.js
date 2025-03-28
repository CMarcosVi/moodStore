const CIRCLE_MOUSE = document.querySelector('.circle-pointer-mouse');
const LINK_NAV_BAR = document.querySelectorAll('.link-nav-bar')
const VALUE_INPUT_YES = document.querySelector('.value-yes');
const VALUE_INPUT_NOT = document.querySelector('.value-not');


VALUE_INPUT_NOT.addEventListener('click', () => {
    VALUE_INPUT_NOT.classList.add('select-value');
    VALUE_INPUT_YES.classList.remove('select-value');
})
VALUE_INPUT_YES.addEventListener('click', () => {
    VALUE_INPUT_NOT.classList.remove('select-value');
    VALUE_INPUT_YES.classList.add('select-value');
})

document.addEventListener('mousemove', (event) => {
    // Atualiza a posição do círculo com base nas coordenadas do mouse
    CIRCLE_MOUSE.style.left = `${event.pageX}px`;
    CIRCLE_MOUSE.style.top = `${event.pageY}px`;
});

  /*
LINK_NAV_BAR.forEach(element => {
    element.addEventListener('mouseover', () => {
        CIRCLE_MOUSE.style.display = 'none'
    })
    element.addEventListener('mouseout', () => {
        CIRCLE_MOUSE.style.display = 'block'
    })
});
*/

