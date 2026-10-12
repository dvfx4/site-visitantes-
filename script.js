
/* =========================================================
   ESTAÇÃO ALEGRIA — FUNCIONALIDADES DO SITE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  atualizarAno();
  carregarConteudosExemplo();
});

/* MENU PARA CELULAR */

function iniciarMenu() {
  const botao = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#menu-principal");

  if (!botao || !menu) return;

  function fecharMenu() {
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
    botao.textContent = "☰";
  }

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");

    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute(
      "aria-label",
      aberto ? "Fechar menu" : "Abrir menu"
    );
    botao.textContent = aberto ? "✕" : "☰";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharMenu();
  });

  document.addEventListener("click", (evento) => {
    if (!menu.contains(evento.target) && !botao.contains(evento.target)) {
      fecharMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) fecharMenu();
  });
}

/* ANO AUTOMÁTICO NO RODAPÉ */

function atualizarAno() {
  const elemento = document.querySelector("#ano-atual");

  if (elemento) {
    elemento.textContent = new Date().getFullYear();
  }
}

/* FUNÇÕES DE SEGURANÇA PARA EXIBIR TEXTO */

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);

  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = String(texto);

  return elemento;
}

function criarLink(url, texto, classe = "btn") {
  const link = criarElemento("a", classe, texto);

  try {
    const destino = new URL(url, window.location.origin);

    if (["http:", "https:"].includes(destino.protocol)) {
      link.href = destino.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.removeAttribute("href");
    }
  } catch {
    link.removeAttribute("href");
  }

  return link;
}

/* CARTÕES DE EVENTOS E PROMOÇÕES */

function criarCartao(item, tipo) {
  const cartao = criarElemento("article", `card card-${tipo}`);

  if (item.imagem) {
    try {
      const imagemURL = new URL(item.imagem, window.location.origin);

      if (["http:", "https:"].includes(imagemURL.protocol)) {
        const imagem = document.createElement("img");

        imagem.src = imagemURL.href;
        imagem.alt = item.titulo || "Imagem da Estação Alegria";
        imagem.loading = "lazy";
        imagem.decoding = "async";

        imagem.addEventListener("error", () => imagem.remove());

        cartao.appendChild(imagem);
      }
    } catch {
      // Ignora endereço de imagem inválido.
    }
  }

  const conteudo = criarElemento("div", "conteudo");

  if (item.categoria) {
    conteudo.appendChild(
      criarElemento("span", "etiqueta", item.categoria)
    );
  }

  conteudo.appendChild(
    criarElemento("h3", "", item.titulo || "Novidade da Estação")
  );

  if (item.data) {
    conteudo.appendChild(
      criarElemento("p", "card-data", item.data)
    );
  }

  if (item.descricao) {
    conteudo.appendChild(
      criarElemento("p", "", item.descricao)
    );
  }

  if (item.link && item.textoLink) {
    conteudo.appendChild(
      criarLink(item.link, item.textoLink, "btn")
    );
  }

  cartao.appendChild(conteudo);
  return cartao;
}

/* AVISOS */

function criarAviso(item) {
  const aviso = criarElemento("article", "card card-aviso");
  const conteudo = criarElemento("div", "conteudo");

  conteudo.appendChild(
    criarElemento("h3", "", item.titulo || "Aviso importante")
  );

  if (item.data) {
    conteudo.appendChild(
      criarElemento("p", "card-data", item.data)
    );
  }

  conteudo.appendChild(
    criarElemento("p", "", item.descricao || "")
  );

  aviso.appendChild(conteudo);
  return aviso;
}

/* GALERIA */

function criarFoto(item) {
  const figura = criarElemento("figure", "galeria-item");
  const imagem = document.createElement("img");

  imagem.src = item.url;
  imagem.alt = item.alt || "Foto da Estação Alegria";
  imagem.loading = "lazy";
  imagem.decoding = "async";

  imagem.addEventListener("error", () => figura.remove());

  figura.appendChild(imagem);

  if (item.legenda) {
    figura.appendChild(
      criarElemento("figcaption", "", item.legenda)
    );
  }

  return figura;
}

/* EXIBIR CONTEÚDO */

function exibirLista(seletor, itens, criarItem, mensagem) {
  const lista = document.querySelector(seletor);

  if (!lista) return;

  lista.replaceChildren();

  if (!Array.isArray(itens) || itens.length === 0) {
    const vazio = criarElemento("article", "card-vazio");

    vazio.appendChild(criarElemento("p", "", mensagem));
    lista.appendChild(vazio);
    return;
  }

  itens.forEach((item) => {
    lista.appendChild(criarItem(item));
  });
}

/* CONTEÚDOS DO SITE
   Estes exemplos são locais, não vêm do painel administrativo.
   Substitua os arrays pelos dados reais quando integrar o Supabase.
*/

function carregarConteudosExemplo() {
  const eventos = [];
  const promocoes = [];
  const avisos = [];
  const fotos = [];

  exibirLista(
    "#eventos-lista",
    eventos,
    (item) => criarCartao(item, "evento"),
    "Nenhum evento publicado no momento."
  );

  exibirLista(
    "#promocoes-lista",
    promocoes,
    (item) => criarCartao(item, "promocao"),
    "Nenhuma promoção publicada no momento."
  );

  exibirLista(
    "#avisos-lista",
    avisos,
    criarAviso,
    "Nenhum aviso publicado no momento."
  );

  exibirLista(
    "#galeria-conteudo",
    fotos,
    criarFoto,
    "Nenhuma foto publicada no momento."
  );
}
