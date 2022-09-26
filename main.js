import { IMG_URL } from "./js/api-key.js"
import { buscarFilmePorTitulo, getFilmesPopulares } from "./js/api.js"
import { salvaFilmeFavoritoLocalStorage, retiraFilmeFavoritoLocalStorage, verificaPertenceFilmeFavorito, getFilmesFavortiosLocalStorage} from "./js/localStorage.js"

const elementoContainerFilmes = document.getElementById('filmes-container')
const formulario = document.querySelector('form')
const botaoPesquisa = document.getElementById('botao_pesquisa')
const checkboxFavoritos = document.getElementById('favoritos')

function mostrarFilmes(listaFilmes){
  limparConteinerFilmes()
  listaFilmes.forEach( filme => renderizarFilme(filme))
}

async function buscarFilme() {

  const input = document.getElementById('pesquisa')
  const tituloFilme = input.value

  if (tituloFilme != '') {
    const filmes = await buscarFilmePorTitulo(tituloFilme)    
    mostrarFilmes(filmes)

  } else {
    window.alert('Informe o título de um filme para fazer a busca!')
  }
}

botaoPesquisa.addEventListener('click', buscarFilme)
formulario.addEventListener('submit', function(e) {
   e.preventDefault()
   buscarFilme()
})

checkboxFavoritos.addEventListener('click', (evento) => verificaExibicaoFilmesFavoritos(evento))

async function verificaExibicaoFilmesFavoritos(evento) {

  if (evento.target.checked){
    const filmesFavoritos = getFilmesFavortiosLocalStorage() || []
    mostrarFilmes(filmesFavoritos)

  } else {
    const filmesPopulares = await getFilmesPopulares()
    mostrarFilmes(filmesPopulares)
  }
}

window.onload =  async function () {
    const filmes = await getFilmesPopulares()
    filmes.forEach(filme => renderizarFilme(filme))
}

function botaoFilmeFavorito(evento, filme) {
    const imagemFavorito = "images/Heart-fill.svg"
    const imagemNaoFavorito = "images/Heart.svg"

    if (evento.target.src.includes(imagemFavorito)){
      evento.target.src = imagemNaoFavorito
      retiraFilmeFavoritoLocalStorage(filme.id)

    } else {
      evento.target.src = imagemFavorito
      salvaFilmeFavoritoLocalStorage(filme)
    }
}

export function limparConteinerFilmes(){
  elementoContainerFilmes.innerHTML = ''
}

function renderizarFilme(filme) {
    const { backdrop_path:imagem, title:titulo, vote_average:classificacao, release_date:data, overview:resumo } = filme

    const ano = new Date(data).getFullYear()
    const favorito = verificaPertenceFilmeFavorito(filme.id)

    const elementoCardFilme = document.createElement("section")
    elementoCardFilme.classList.add("filmes__card-filme")
    elementoContainerFilmes.appendChild(elementoCardFilme);

    const elementoImagemFilme = document.createElement("img")
    elementoImagemFilme.setAttribute("src",`${IMG_URL}${imagem}`)
    elementoImagemFilme.setAttribute("alt", `${titulo} Poster`)
    elementoImagemFilme.classList.add("card-filme__imagem")
    elementoCardFilme.appendChild(elementoImagemFilme)

    const elementoFilmeDescricao = document.createElement("div")
    elementoFilmeDescricao.classList.add("card-filme__descricao")
    elementoCardFilme.appendChild(elementoFilmeDescricao)

    const elementoTituloFilme = document.createElement("h2")
    elementoTituloFilme.classList.add("card-filme__titulo")
    elementoTituloFilme.textContent = `${titulo} (${ano})`
    elementoFilmeDescricao.appendChild(elementoTituloFilme)

    const elementoClassificacaoFilme = document.createElement("p")
    elementoClassificacaoFilme.classList.add("card-filme__classificacao")
    elementoClassificacaoFilme.textContent = `${classificacao}`
    elementoFilmeDescricao.appendChild(elementoClassificacaoFilme)

    const elementoCointainerFavoritar = document.createElement("div")
    elementoCointainerFavoritar.classList.add("card-filme__favoritar")
    elementoFilmeDescricao.appendChild(elementoCointainerFavoritar)

    const elementoImagemFavorito = document.createElement("img")
    elementoImagemFavorito.classList.add("card-filme__btn-favoritar")
    elementoImagemFavorito.setAttribute("src", favorito ? "./images/Heart-fill.svg" : "./images/Heart.svg")
    elementoImagemFavorito.setAttribute("alt", "Ícone de favorito")
    elementoImagemFavorito.addEventListener('click', (evento) => botaoFilmeFavorito(evento, filme))
    elementoCointainerFavoritar.appendChild(elementoImagemFavorito)

    const elementoTextoFavorito = document.createElement("p")
    elementoTextoFavorito.classList.add("card-filme__texto")
    elementoTextoFavorito.textContent = favorito ? "Favorito" : "Favoritar"
    elementoCointainerFavoritar.appendChild(elementoTextoFavorito)

    const elementoResumoFilme = document.createElement("p")
    elementoResumoFilme.classList.add("card-filme__resumo")
    elementoResumoFilme.textContent = `${resumo}`
    elementoCardFilme.appendChild(elementoResumoFilme)
}

