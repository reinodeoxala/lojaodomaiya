const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfMSS4eNDSyxy558PIJ3SbMeGWolSWa3hi5yzomDK6XYALEcdPM6s-toS0SFaZL-e-QC7jQvJVVcxW/pub?gid=0&single=true&output=csv";

fetch(csvUrl)
  .then(res => res.text())
  .then(text => {
    const linhas = text.split("\n").slice(1);
    const produtos = [];

    linhas.forEach(linha => {
      const [
        id, nome, categoria, preco,
        desconto, estoque, imagem, destaque
      ] = linha.split(",");

      if (!nome) return;

      produtos.push({
        id,
        nome,
        categoria,
        preco: Number(preco),
        desconto: Number(desconto),
        estoque: Number(estoque),
        imagem,
        destaque
      });
    });

    document.body.innerHTML = `
      <h2 style="color:white;text-align:center">
        Produtos carregados: ${produtos.length}
      </h2>
    `;
  })
  .catch(err => {
    document.body.innerHTML = "<p style='color:red'>ERRO AO LER PLANILHA</p>";
    console.error(err);
  });
