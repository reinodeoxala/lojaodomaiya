const sheetId = "1idAM2RcbiKMUhJfnX1ju3VE5tY2-zTbER128HjSnGJU";
const url = https://opensheet.elk.sh/${sheetId}/Sheet1;

function driveImage(link) {
  return link.replace("file/d/", "uc?id=").replace("/view", "");
}

fetch(url)
  .then(res => res.json())
  .then(produtos => {

    const conteudo = document.getElementById("conteudo");
    const filtros = document.getElementById("filtros");

    const categorias = [...new Set(produtos.map(p => p.categoria))];

    filtros.innerHTML = <button class="active" onclick="filtrar('all')">Todos</button>;
    categorias.forEach(cat => {
      filtros.innerHTML += <button onclick="filtrar('${cat}')">${cat}</button>;
    });

    window.filtrar = function(cat) {
      document.querySelectorAll("#filtros button").forEach(b => b.classList.remove("active"));
      event.target.classList.add("active");

      document.querySelectorAll(".categoria").forEach(sec => {
        sec.style.display = cat === "all" || sec.dataset.cat === cat ? "block" : "none";
      });
    }

    categorias.forEach(cat => {
      const sec = document.createElement("section");
      sec.className = "categoria";
      sec.dataset.cat = cat;
      sec.innerHTML = <h2>${cat.toUpperCase()}</h2><div class="grid"></div>;
      const grid = sec.querySelector(".grid");

      produtos.filter(p => p.categoria === cat).forEach(p => {
        const preco = Number(p.preco);
        const desconto = Number(p.desconto);
        const final = desconto > 0 ? preco - desconto : preco;

        grid.innerHTML += `
          <div class="card">
            ${desconto > 0 ? <div class="promo">PROMOÇÃO</div> : ""}
            <img src="${driveImage(p.imagem)}">
            <h3>${p.nome}</h3>
            <p>${p.descricao}</p>
            <div class="preco">
              ${desconto > 0 ? <del>R$ ${preco.toFixed(2)}</del><br> : ""}
              <strong>R$ ${final.toFixed(2)}</strong>
            </div>
          </div>
        `;
      });

      conteudo.appendChild(sec);
    });
  });
