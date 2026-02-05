import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const produtosContainer = document.getElementById("produtos");

async function carregarProdutos() {
  const querySnapshot = await getDocs(collection(db, "produtos"));
  produtosContainer.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const p = doc.data();
    produtosContainer.innerHTML += `
      <div class="card">
        <img src="${p.imagem}" loading="lazy">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco}</p>
        <span>Estoque: ${p.estoque}</span>
      </div>
    `;
  });
}

carregarProdutos();
