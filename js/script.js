// --- DESTAQUE DO LINK ATIVO ---
function destacarLinkAtivo() {
    const linksMenu = document.querySelectorAll(".menu a");
    const urlAtual = window.location.pathname;
    
    // Extrai o nome da página (ex: sobre.html) da URL
    const paginaAtual = urlAtual.split("/").pop() || "index.html";

    linksMenu.forEach(link => {
        const href = link.getAttribute("href");
        
        // Se o link corresponde à página atual
        if (paginaAtual === href) {
            link.classList.add("ativo");
        } else {
            link.classList.remove("ativo");
        }
    });
}

// Executa a função ao carregar a página
document.addEventListener("DOMContentLoaded", destacarLinkAtivo);

// --- MENU RESPONSIVO ---
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("ativo");
        menuToggle.textContent = menu.classList.contains("ativo") ? "✕" : "☰";
    });

    const linksMenu = document.querySelectorAll(".menu a");
    linksMenu.forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("ativo");
            menuToggle.textContent = "☰";
        });
    });
}

// --- TEMA CLARO/ESCURO ---
const btnTema = document.getElementById("btnTema");
const body = document.body;

const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "escuro") {
    body.classList.add("tema-escuro");
    if (btnTema) btnTema.innerHTML = sunIcon;
} else {
    if (btnTema) btnTema.innerHTML = moonIcon;
}

if (btnTema) {
    btnTema.addEventListener("click", function () {
        body.classList.toggle("tema-escuro");
        
        const isEscuro = body.classList.contains("tema-escuro");
        localStorage.setItem("tema", isEscuro ? "escuro" : "claro");
        
        btnTema.innerHTML = isEscuro ? sunIcon : moonIcon;
    });
}

// --- VALIDAÇÃO DE FORMULÁRIO ---
const formContato = document.getElementById("formContato");

if (formContato) {
    formContato.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        const erroNome = document.getElementById("erroNome");
        const erroEmail = document.getElementById("erroEmail");
        const erroMensagem = document.getElementById("erroMensagem");
        const mensagemSucesso = document.getElementById("mensagemSucesso");

        erroNome.textContent = "";
        erroEmail.textContent = "";
        erroMensagem.textContent = "";
        mensagemSucesso.textContent = "";

        let formularioValido = true;

        if (nome === "") {
            erroNome.textContent = "Por favor, informe seu nome.";
            formularioValido = false;
        }

        if (email === "") {
            erroEmail.textContent = "Por favor, informe seu e-mail.";
            formularioValido = false;
        } else if (!validarEmail(email)) {
            erroEmail.textContent = "Informe um e-mail válido. Exemplo: usuario@dominio.com";
            formularioValido = false;
        }

        if (mensagem === "") {
            erroMensagem.textContent = "Por favor, escreva uma mensagem.";
            formularioValido = false;
        }

        if (formularioValido) {
            mensagemSucesso.textContent = "Mensagem enviada com sucesso!";
            alert("Mensagem enviada com sucesso!");
            formContato.reset();
        }
    });
}

function validarEmail(email) {
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padraoEmail.test(email);
}
