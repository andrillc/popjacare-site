// 1. Efeito no Cabeçalho ao rolar a página
const header = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Se o usuário descer mais de 50 pixels, o cabeçalho fica escuro e menor
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Animação suave de entrada dos elementos (Fade in e deslize para cima)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // O efeito ativa quando 15% do elemento aparece na tela
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Para a animação após acontecer uma vez
        }
    });
}, observerOptions);

// Aplica a animação na seção 'Sobre'
const aboutSection = document.querySelector('.about .container');
if (aboutSection) {
    // Estado inicial: invisível e levemente para baixo
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(40px)';
    aboutSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    
    // Inicia a observação
    observer.observe(aboutSection);
} // 3. Funcionalidade do Menu Mobile
const btnMobile = document.querySelector('.mobile-menu-btn');
const menuMobile = document.querySelector('.mobile-menu');

if (btnMobile && menuMobile) {
    btnMobile.addEventListener('click', () => {
        // Adiciona ou tira a classe 'active' que faz o menu deslizar
        menuMobile.classList.toggle('active');
        
        // Efeito de "X" no botão hambúrguer
        const spans = btnMobile.querySelectorAll('span');
        if (menuMobile.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fecha o menu se clicar em um link
    const linksMobile = menuMobile.querySelectorAll('a');
    linksMobile.forEach(link => {
        link.addEventListener('click', () => {
            menuMobile.classList.remove('active');
            const spans = btnMobile.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}