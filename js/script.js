const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfMSS4eNDSyxy558PIJ3SbMeGWolSWa3hi5yzomDK6XYALEcdPM6s-toS0SFaZL-e-QC7jQvJVVcxW/pub?gid=0&single=true&output=csv";

fetch(csvUrl)
  .then(res => res.text())
  .then(csv => {
    const linhas = csv.split("\n").slice(1);
    const container = document.getElementById("produtos");

    linhas.forEach(linha => {
      const [
        id,
        nome,
        categoria,
        preco,
        desconto,
        estoque,
        imagem,
        destaque
      ] = linha.split(",");

      if (!nome) return;

      const precoFinal = desconto && desconto > 0
        ? (preco - desconto).toFixed(2)
        : preco;

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        ${destaque === "sim" ? <div class="badge">Promoção</div> : ""}
        <img src="${imagem}" alt="${nome}">
        <h3>${nome}</h3>
        <p>${categoria}</p>
        <p class="preco">R$ ${precoFinal}</p>
        ${desconto > 0 ? <p class="desconto">Desconto: R$ ${desconto}</p> : ""}
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    document.body.innerHTML = "Erro ao carregar produtos";
    console.error(err);
  });
