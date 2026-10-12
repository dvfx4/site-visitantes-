"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const menuToggle = document.getElementById("menuToggle");
  const anoAtual = document.getElementById("anoAtual");
  const whatsappLink = document.getElementById("whatsappLink");

  // Atualiza o ano do rodapé
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  // Abre e fecha o menu no celular
  if (menu && menuToggle) {
    menuToggle.addEventListener("click", () => {
      const aberto = menu.classList.toggle("aberto");

      menuToggle.setAttribute("aria-expanded", String(aberto));
      menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
      );
      menuToggle.textContent = aberto ? "✕" : "☰";
    });

    // Fecha o menu após clicar em uma seção
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      });
    });

    // Fecha o menu ao pressionar Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menu.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      }
    });
  }

  // WhatsApp: substitua pelo número oficial do clube.
  // Formato: código do país + DDD + número, somente números.
  const numeroWhatsApp = "";

  if (whatsappLink) {
    if (numeroWhatsApp.trim() !== "") {
      const mensagem = encodeURIComponent(
        "Olá! Gostaria de saber mais sobre a Estação Alegria."
      );

      whatsappLink.href =
        `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    } else {
      whatsappLink.href =
        "https://www.instagram.com/estacao_alegria_oficial/";
      whatsappLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.open(
          "https://www.instagram.com/estacao_alegria_oficial/",
          "_blank",
          "noopener,noreferrer"
        );
      });
    }
  }
});
