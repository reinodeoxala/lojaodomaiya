const sheetId = "1idAM2RcbiKMUhJfnX1ju3VE5tY2-zTbER128HjSnGJU";
const url = https://opensheet.elk.sh/${sheetId}/Sheet1;

fetch(url)
  .then(res => res.json())
  .then(dados => {
    console.log(dados); // 👈 DEBUG
    document.body.innerHTML += "<p>DADOS CARREGADOS: " + dados.length + "</p>";
  })
  .catch(err => {
    document.body.innerHTML += "<p>ERRO AO CARREGAR PLANILHA</p>";
    console.error(err);
  });
