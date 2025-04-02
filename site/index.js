const CIRCLE_MOUSE = document.querySelector('.circle-pointer-mouse');
const LINK_NAV_BAR = document.querySelectorAll('.link-nav-bar')
const VALUE_INPUT_YES = document.querySelector('.value-yes');
const VALUE_INPUT_NOT = document.querySelector('.value-not');
const LIST_TECNOLOGIS_SELECT = document.querySelector('.tecnologis-list')
const TECNOLOGIS_USED = document.querySelectorAll('.tecnologis')
const SERVICE_LIST = document.querySelectorAll('.service')
const MOVING_IMG_MOUSE = document.getElementById("Moving");
const TITLE_ANIMATION = document.getElementById("title")
const PREV_BTN = document.getElementById("btn-prev");
const NEXT_BTN = document.getElementById("btn-next");
const SERVICE_CONTAINER = document.querySelector(".list-servies");
const SERVICE = document.querySelectorAll("service");
const SCROLL_CONTAINER = document.querySelector('.scroll-container');
const SERVICE_ITEM = document.querySelectorAll('.service-item')
const SERVICE_LOADING = document.querySelector('.loading-projects')
const SERVICE_LOADING_TEXT = document.querySelector('.text-loading')


SERVICE_ITEM.forEach((element) => {
    element.addEventListener("mouseover", () => {
        CIRCLE_MOUSE.classList.add('hover-service-item');
    });
    element.addEventListener("mouseout", () => {
        CIRCLE_MOUSE.classList.remove('hover-service-item');
    });
    element.addEventListener("click", () => {
        SERVICE_LOADING.classList.add('show-loading'); // Adiciona a classe que ativa a animação
        SERVICE_LOADING_TEXT.innerText = element.textContent;

        // Após 2,5 segundos, esconder o SERVICE_LOADING
        setTimeout(() => {
            SERVICE_LOADING.classList.remove('show-loading'); // Remove a animação e oculta
        }, 1500); // 2,5 segundos
    });
});

NEXT_BTN.addEventListener("click", () => {
    let currentTop = parseInt(SERVICE_CONTAINER.style.top) || 0;
    let newTop = currentTop - 100;
    SERVICE_CONTAINER.style.top = newTop + "%";
    if (newTop <= -400) {
        SERVICE_CONTAINER.style.top = "-0%";
    }
});

PREV_BTN.addEventListener("click", () => {
    let currentTop = parseInt(SERVICE_CONTAINER.style.top) || 0;
    let newTop = currentTop + 100;
    SERVICE_CONTAINER.style.top = newTop + "%";
    if (newTop >= 0) {
        SERVICE_CONTAINER.style.top = "-300%";
    }
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const containerHeight = SCROLL_CONTAINER.offsetHeight;
    const opacityLossFactor = 0.0013;
    let opacity = 1 - (scrollPosition * opacityLossFactor);
    opacity = Math.max(0, opacity);
    SCROLL_CONTAINER.style.opacity = opacity;
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