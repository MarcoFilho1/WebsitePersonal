document.addEventListener('DOMContentLoaded', function () {
    // ========= COOKIE NOTICE =========
    const cookieNotice = document.querySelector('.cookie-notice');
    if (cookieNotice) {
        const cookieButton = cookieNotice.querySelector('button');
        if (!localStorage.getItem('cookieAccepted')) {
            cookieNotice.style.display = 'block';
        }
        cookieButton.addEventListener('click', function () {
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
            const BASE_URL = '';
            const bgUrl = slide.getAttribute('data-bg');
            slide.style.setProperty('--bg', `url('${BASE_URL}${bgUrl}')`);
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

    // ========= MENU HAMBURGUER =========
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.nav-overlay');

    function closeMenu() {
        nav.classList.remove('active');
        hamburger.classList.remove('fa-times');
        overlay.style.display = 'none';
        document.querySelectorAll('.dropdown.active')
            .forEach(dd => dd.classList.remove('active'));
    }

    if (hamburger && nav) {
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

        document.addEventListener('click', e => {
            if (!e.target.closest('nav') && !e.target.closest('.hamburger')) {
                closeMenu();
            }
        });

        window.addEventListener('scroll', () => {
            if (nav.classList.contains('active')) {
                closeMenu();
            }
        });
        window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero-bg');
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        if (scrollPosition > 50) {
            hero.classList.add('scroll-active');
        } else {
            hero.classList.remove('scroll-active');
        }
        });

        document.querySelectorAll('.dropdown > a').forEach(link => {
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const thisDropdown = this.parentElement;
                    document.querySelectorAll('.dropdown.active')
                        .forEach(dd => {
                            if (dd !== thisDropdown) dd.classList.remove('active');
                        });
                    thisDropdown.classList.toggle('active');
                }
            });
        });

        overlay.addEventListener('click', closeMenu);
    }

    // ========= FETCH FORMULÁRIO DE CONTATO =========
    const contatoContainer = document.getElementById('contato');
    if (contatoContainer) {
        fetch('assets/includes/contato.html')
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.text();
            })
            .then(html => {
                contatoContainer.innerHTML = html;
                const urlParams = new URLSearchParams(window.location.search);
                const scrollTo = urlParams.get('scrollTo');
                if (scrollTo === 'contato') {
                    setTimeout(() => {
                        const target = document.getElementById(scrollTo);
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            })
            .catch(err => {
                console.error(err);
                contatoContainer.textContent = 'Erro ao carregar formulário.';
            });
    }

    // ========= VANTAGENS =========
    const vantagemButtons = document.querySelectorAll('.vantagens__lista li');
    const vantagemDescricoes = document.querySelectorAll('.vantagens__descricao .descricao-item');

    vantagemButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe "ativo" de todos os botões e descrições
            vantagemButtons.forEach(b => b.classList.remove('ativo'));
            vantagemDescricoes.forEach(d => d.classList.remove('ativo'));

            // Adiciona a classe "ativo" ao botão clicado
            btn.classList.add('ativo');

            // Pega o valor do data-info e encontra o parágrafo correspondente
            const info = btn.getAttribute('data-info');
            const descricao = document.getElementById(info);

            // Adiciona a classe "ativo" à descrição correspondente
            if (descricao) {
                descricao.classList.add('ativo');
            }
        });
    });

    window.addEventListener('load', () => {
        const faixa = document.getElementById('clientes-faixa');
        const faixaWidth = faixa.offsetWidth / 2;

        faixa.style.setProperty('--faixa-width', `${faixaWidth}px`);

        faixa.style.animation = `deslizar linear infinite 30s`;
    });

    
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            answer.classList.toggle('visible');
            icon.classList.toggle('fa-chevron-up');
        });
    });
    

});
