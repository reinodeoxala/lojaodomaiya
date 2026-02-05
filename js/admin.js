import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const form = document.getElementById("form-produto");
const lista = document.getElementById("lista-produtos");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = form.nome.value;
  const preco = form.preco.value;
  const estoque = form.estoque.value;
  const imagem = form.imagem.value;

  await addDoc(collection(db, "produtos"), {
    nome,
    preco,
    estoque,
    imagem
  });

  form.reset();
  carregarProdutos();
});

async function carregarProdutos() {
  lista.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "produtos"));

  querySnapshot.forEach((docSnap) => {
    const p = docSnap.data();
    lista.innerHTML += `
      <li>
        ${p.nome} — R$ ${p.preco}
        <button onclick="excluir('${docSnap.id}')">Excluir</button>
      </li>
    `;
  });
}

window.excluir = async (id) => {
  await deleteDoc(doc(db, "produtos", id));
  carregarProdutos();
};

document.getElementById("logout").onclick = () => {
  signOut(auth);
};

carregarProdutos();
