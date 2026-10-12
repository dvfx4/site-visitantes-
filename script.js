
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const anoAtual = document.getElementById("anoAtual");

  // Atualiza o ano automaticamente
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  // Abre e fecha o menu no celular
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const estaAberto = menu.classList.toggle("aberto");

      menuToggle.setAttribute("aria-expanded", String(estaAberto));
      menuToggle.setAttribute(
        "aria-label",
        estaAberto ? "Fechar menu" : "Abrir menu"
      );
    });

    // Fecha o menu depois de tocar em uma seção
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      });
    });

    // Fecha o menu com Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menu.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
      }
    });
  }

  // Links oficiais do Instagram
  const instagramUrl = "https://www.instagram.com/estacao_alegria_oficial/";
  const instagramLink = document.getElementById("instagramLink");

  if (instagramLink) {
    instagramLink.href = instagramUrl;
  }

  // Ainda não foi configurado um número de WhatsApp.
  // Por enquanto, o botão abre o Instagram oficial.
  const whatsappLink = document.getElementById("whatsappLink");

  if (whatsappLink) {
    whatsappLink.href = instagramUrl;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
  }
});
