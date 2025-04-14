const CIRCLE_MOUSE = document.querySelector('.circle-pointer-mouse');
const LINK_NAV_BAR = document.querySelectorAll('.link-nav-bar')
const VALUE_INPUT_YES = document.querySelector('.value-yes');
const VALUE_INPUT_NOT = document.querySelector('.value-not');
const LIST_TECNOLOGIS_SELECT = document.querySelector('.tecnologis-list')
const TECNOLOGIS_USED = document.querySelectorAll('.tecnologis')
const SERVICE_LIST = document.querySelectorAll('.service')
const MOVING_IMG_MOUSE = document.getElementById("Moving");
const MOVING_IMG_MOUSE2 = document.getElementById("Moving2");
const TITLE_ANIMATION = document.getElementById("title")
const PREV_BTN = document.getElementById("btn-prev");
const NEXT_BTN = document.getElementById("btn-next");
const SERVICE_CONTAINER = document.querySelector(".list-servies");
const SERVICE = document.querySelectorAll("service");
const SCROLL_CONTAINER = document.querySelector('.scroll-container');
const SERVICE_LOADING = document.querySelector('.loading-projects')
const SERVICE_LOADING_TEXT = document.querySelector('.text-loading')
const SERVICES_LIST = document.querySelectorAll(".service-type-2");
const TECNOLOGIS_LIST = document.querySelectorAll(".tecnologis-used");
const ABAOUT_AREA = document.querySelector(".about-text");
const LOGO_ABAOUT_AREA = document.querySelector(".logo-text-container");


const CONTAINER_FRONT_END = document.getElementsByClassName("front-end-container")[0]; // Acessando o primeiro elemento
const TITLE_FRONT_END = document.getElementById("title-front-end");

const CONTAINER_BACK_END = document.getElementsByClassName("back-end-container")[0]; // Acessando o primeiro elemento
const TITLE_BACK_END = document.getElementById("title-back-end");

const CONTAINER_OUTHERS = document.getElementsByClassName("outher-container")[0]; // Acessando o primeiro elemento
const TITLE_OUTHER_TECH = document.getElementById("title-outhers");

const SECTION_TECH = document.getElementById("tecnologys");
const TECHNOLOGY_LISTS_1 = document.querySelectorAll(".list-tecn-tecnologys1");
const TECHNOLOGY_LISTS_2 = document.querySelectorAll(".list-tecn-tecnologys2");
const TECHNOLOGY_LISTS_3 = document.querySelectorAll(".list-tecn-tecnologys3");

const isElementCentered = (el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elementCenter = rect.top + rect.height / 2;
    return elementCenter >= windowHeight * 0.05 - 10 && elementCenter <= windowHeight * 0.9 + 10;
};




const handleScroll = () => {
    if (isElementCentered(CONTAINER_FRONT_END)) {
        TITLE_FRONT_END.classList.add("animation-title");
        TITLE_FRONT_END.style.setProperty("--before-animation", "animation-slider-shadow 1.5s linear both");
        TECHNOLOGY_LISTS_1.forEach(list => {
            list.classList.add("start-animation");
        });
    }
    if (isElementCentered(CONTAINER_BACK_END)) {
        TITLE_BACK_END.classList.add("animation-title");
        TITLE_BACK_END.style.setProperty("--before-animation", "animation-slider-shadow 1.5s linear both");
        TECHNOLOGY_LISTS_2.forEach(list => {
            list.classList.add("start-animation");
        });
    }
    if (isElementCentered(CONTAINER_OUTHERS)) {
        TITLE_OUTHER_TECH.classList.add("animation-title");
        TITLE_OUTHER_TECH.style.setProperty("--before-animation", "animation-slider-shadow 1.5s linear both");
        TECHNOLOGY_LISTS_3.forEach(list => {
            list.classList.add("start-animation");
        });
    }
};

window.addEventListener("scroll", handleScroll);


window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const containerHeight = SCROLL_CONTAINER.offsetHeight;
    const opacityLossFactor = 0.0013;
    let opacity = 1 - (scrollPosition * opacityLossFactor);
    opacity = Math.max(0, opacity);
    SCROLL_CONTAINER.style.opacity = opacity;
});

ABAOUT_AREA.addEventListener("mouseover", () => {
    CIRCLE_MOUSE.style.borderColor = "#000"; 
});

ABAOUT_AREA.addEventListener("mouseout", () => {
    CIRCLE_MOUSE.style.borderColor = "#fff"; 
});

LOGO_ABAOUT_AREA.addEventListener("mouseover", () => {
    CIRCLE_MOUSE.style.borderColor = "#fff"; 
});

LOGO_ABAOUT_AREA.addEventListener("mouseout", () => {
    CIRCLE_MOUSE.style.borderColor = "#000"; 
});

SERVICES_LIST.forEach((element) => {
    element.addEventListener("mouseover", () => {
        CIRCLE_MOUSE.style.borderColor = "#000"; 
    })
    element.addEventListener("mouseout", () => {
        CIRCLE_MOUSE.style.borderColor = "#fff"; 
    })
});

TECNOLOGIS_LIST.forEach((element) => {
    element.addEventListener("mouseover", () => {
        CIRCLE_MOUSE.style.borderColor = "#000"; 
    })
    element.addEventListener("mouseout", () => {
        CIRCLE_MOUSE.style.borderColor = "#fff"; 
    })
});
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
document.addEventListener("mousemove", (ev) => {
    const positionX = (window.innerWidth / -90 - ev.x) / 70;
    const positionY = (window.innerHeight / 2 - ev.y) / 50; 

    MOVING_IMG_MOUSE2.style.transform = `translate(${positionX}px, ${positionY}px)`;
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