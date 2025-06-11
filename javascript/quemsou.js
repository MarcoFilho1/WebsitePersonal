document.addEventListener('DOMContentLoaded', function() {
    // ========= COOKIE NOTICE =========
    const cookieNotice = document.querySelector('.cookie-notice');
    if (cookieNotice) {
        const cookieButton = cookieNotice.querySelector('button');
        if (!localStorage.getItem('cookieAccepted')) {
            cookieNotice.style.display = 'block';
        }
        cookieButton.addEventListener('click', function() {
            cookieNotice.style.display = 'none';
            localStorage.setItem('cookieAccepted', 'true');
        });
    }

    // ========= MENU HAMBURGUER =========
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const hamburgerIcon = hamburger.querySelector('i');

    function toggleMenu() {
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            document.body.style.overflow = '';
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    }

    if (hamburger && nav) {
        // Abrir/fechar menu
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Fechar ao clicar no overlay
        navOverlay.addEventListener('click', function() {
            toggleMenu();
        });

        // Fechar ao clicar em links do menu (exceto dropdown)
        document.querySelectorAll('nav a:not(.dropdown > a)').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    toggleMenu();
                }
            });
        });

        // Dropdown mobile
        document.querySelectorAll('.dropdown > a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    parent.classList.toggle('active');
                }
            });
        });
    }

    // ========= CARROSSEL =========
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        let index = 0;

        // Configurar imagens de fundo
        slides.forEach(slide => {
            const bgUrl = slide.getAttribute('data-bg');
            slide.style.setProperty('--bg', `url(/GalpaoAtualizado/${bgUrl})`);
        });

        // Função de movimento do carrossel
        const moveTo = (i) => {
            track.style.transform = `translateX(-${i * 100}%)`;
            index = i;
        };

        // Botão anterior
        document.querySelector('.prev-btn')?.addEventListener('click', () => {
            moveTo((index - 1 + slides.length) % slides.length);
        });

        // Botão próximo
        document.querySelector('.next-btn')?.addEventListener('click', () => {
            moveTo((index + 1) % slides.length);
        });
    }

    // ========= FAQ TOGGLE =========
    document.querySelectorAll('.faq-pergunta').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const resposta = item.querySelector('.faq-resposta');

            // Fecha outros FAQ abertos
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-resposta').style.maxHeight = null;
                    otherItem.classList.remove('ativo');
                }
            });

            // Alterna a exibição da resposta atual
            if (item.classList.contains('ativo')) {
                resposta.style.maxHeight = null;
                item.classList.remove('ativo');
            } else {
                resposta.style.maxHeight = resposta.scrollHeight + 'px';
                item.classList.add('ativo');
            }
        });
    });
});