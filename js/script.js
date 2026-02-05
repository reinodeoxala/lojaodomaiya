const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfMSS4eNDSyxy558PIJ3SbMeGWolSWa3hi5yzomDK6XYALEcdPM6s-toS0SFaZL-e-QC7jQvJVVcxW/pub?gid=0&single=true&output=csv";

fetch(csvUrl)
  .then(res => res.text())
  .then(csv => {
    const linhas = csv.trim().split("\n").slice(1);
    const container = document.getElementById("produtos");

    container.innerHTML = "";

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

      const precoNum = parseFloat(preco) || 0;
      const descontoNum = parseFloat(desconto) || 0;
      const precoFinal = descontoNum > 0
        ? (precoNum - descontoNum).toFixed(2)
        : precoNum.toFixed(2);

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        ${destaque === "sim" ? <div class="promo">Promoção</div> : ""}
        <img src="${imagem}" alt="${nome}">
        <h3>${nome}</h3>
        <p>${categoria}</p>
        <p class="preco">
          ${descontoNum > 0 ? <del>R$ ${precoNum.toFixed(2)}</del><br> : ""}
          <strong>R$ ${precoFinal}</strong>
        </p>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("produtos").innerHTML =
      "<p style='color:red'>Erro ao carregar produtos</p>";
    console.error(err);
  });
