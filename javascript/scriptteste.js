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

        // Fun��o de movimento do carrossel
        const moveTo = (i) => {
            track.style.transform = `translateX(-${i * 100}%)`;
            index = i;
        };

        // Bot�o anterior
        document.querySelector('.prev-btn')?.addEventListener('click', () => {
            moveTo((index - 1 + slides.length) % slides.length);
        });

        // Bot�o pr�ximo
        document.querySelector('.next-btn')?.addEventListener('click', () => {
            moveTo((index + 1) % slides.length);
        });
    }

    // ========= MENU HAMBURGUER =========
    const hamburger = document.querySelector('.hamburger');
    const nav       = document.querySelector('nav');
    const overlay   = document.querySelector('.nav-overlay');

    // Helper para fechar menu + submenus
    function closeMenu() {
        nav.classList.remove('active');
        hamburger.classList.remove('fa-times');
        overlay.style.display = 'none';
        document.querySelectorAll('.dropdown.active')
            .forEach(dd => dd.classList.remove('active'));
    }

    if (hamburger && nav) {
        // Abre / fecha menu
        hamburger.addEventListener('click', e => {
            e.stopPropagation();
            if (nav.classList.contains('active')) {
                closeMenu();
            } else {
                nav.classList.add('active');
                hamburger.classList.add('fa-times');
                overlay.style.display = 'block';
            }
        });

        // Fechar ao clicar fora
        document.addEventListener('click', e => {
            if (!e.target.closest('nav') && !e.target.closest('.hamburger')) {
                closeMenu();
            }
        });

        // Fechar ao rolar
        window.addEventListener('scroll', () => {
            if (nav.classList.contains('active')) {
                closeMenu();
            }
        });

        // Dropdown mobile (toggle exclusivo)
        document.querySelectorAll('.dropdown > a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const thisDropdown = this.parentElement;
                    // fecha todos os outros
                    document.querySelectorAll('.dropdown.active')
                        .forEach(dd => {
                            if (dd !== thisDropdown) dd.classList.remove('active');
                        });
                    // abre/fecha o clicado
                    thisDropdown.classList.toggle('active');
                }
            });
        });

        // Fechar menu ao clicar em links (exceto dropdown-toggle)
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', e => {
                if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
                    closeMenu();
                }
            });
        });

        // Fechar ao clicar no overlay
        overlay.addEventListener('click', () => {
            closeMenu();
        });
    }
    // ========= FAQ TOGGLE =========
    document.querySelectorAll('.faq-pergunta').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const resposta = item.querySelector('.faq-resposta');

            // Fecha outros FAQ abertos, se quiser comportamento tipo "acordeão"
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


