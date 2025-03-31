const CIRCLE_MOUSE = document.querySelector('.circle-pointer-mouse');
const LINK_NAV_BAR = document.querySelectorAll('.link-nav-bar')
const VALUE_INPUT_YES = document.querySelector('.value-yes');
const VALUE_INPUT_NOT = document.querySelector('.value-not');
const LIST_TECNOLOGIS_SELECT = document.querySelector('.tecnologis-list')
const TECNOLOGIS_USED = document.querySelectorAll('.tecnologis')
const SERVICE_LIST = document.querySelectorAll('.service')
const MOVING_IMG_MOUSE = document.getElementById("Moving");
const TITLE_ANIMATION = document.getElementById("title")
const scrollContainer = document.querySelector('.scroll-container');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const containerHeight = scrollContainer.offsetHeight;
    const opacityLossFactor = 0.0013;
    let opacity = 1 - (scrollPosition * opacityLossFactor);
    opacity = Math.max(0, opacity);
    scrollContainer.style.opacity = opacity;
});


const scrollToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

TECNOLOGIS_USED.forEach((element) => {
    element.addEventListener("click", () => {
        element.classList.toggle('select-tecnologi');
    });
    element.addEventListener("mouseover", () => {
        CIRCLE_MOUSE.style.borderColor = element.classList.contains('select-tecnologi') ? "#000" : "#fff";
    });
    element.addEventListener("mouseout", () => {
        CIRCLE_MOUSE.style.borderColor = "#fff"; 
    });
});
SERVICE_LIST.forEach((element) => {
    element.addEventListener("click", () => {
        element.classList.toggle('select-service');
    });
    element.addEventListener("mouseover", () => {
        if(element.classList.contains('select-service')){
            CIRCLE_MOUSE.style.borderColor = "#000"; 
        }
    })
    element.addEventListener("mouseout", () => {
        if(element.classList.contains('select-service')){
            CIRCLE_MOUSE.style.borderColor = "#fff"; 
        }
    })
})


document.addEventListener("mousemove", (ev) => {
    const positionX = (window.innerWidth / -90 - ev.x) / 70;
    const positionY = (window.innerHeight / 2 - ev.y) / 50; 

    MOVING_IMG_MOUSE.style.transform = `translate(${positionX}px, ${positionY}px)`;
    TITLE_ANIMATION.style.transform = `translate(${positionX}px, ${positionY}px)`
});


VALUE_INPUT_NOT.addEventListener('click', () => {
    VALUE_INPUT_NOT.classList.add('select-value');
    VALUE_INPUT_YES.classList.remove('select-value');
    LIST_TECNOLOGIS_SELECT.classList.remove("hide-list");;
})
VALUE_INPUT_YES.addEventListener('click', () => {
    VALUE_INPUT_NOT.classList.remove('select-value');
    VALUE_INPUT_YES.classList.add('select-value');
    LIST_TECNOLOGIS_SELECT.classList.add("hide-list");
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
const targetAnimation = () => {
    TITLE_ANIMATION.style.animation = "animation-tec-text 6s infinite linear"
    TITLE_ANIMATION.children[0].style.animation = "animation-tec-text 5s infinite linear";
    TITLE_ANIMATION.children[1].style.animation = "animation-tec-text 4s infinite linear";
    TITLE_ANIMATION.children[2].style.animation = "animation-tec-text 3s infinite linear";
}
setTimeout(targetAnimation, 5000)
scrollToSection("loginBtn");
scrollToSection();
scrollToSection();
scrollToSection();