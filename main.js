import { API_KEY, BASE_URL, IMG_URL, language} from "./api.js"

const elementoContainerFilmes = document.getElementById('filmes-container')

  async function getFilmesPopulares() {

    const url = `${BASE_URL}?${API_KEY}&${language}&page=1`
  
    const resposta = await fetch(url)
    const { results } = await resposta.json()
    
    return results
}
  
  window.onload =  async function () {

    const filmes = await getFilmesPopulares()
    console.log(filmes)
    filmes.forEach(filme => renderizarFilme(filme))
  }


  function renderizarFilme(filme) {
    const { backdrop_path:imagem, title:titulo, vote_average
      :classificacao, release_date
      :data, overview
      :resumo } = filme

    const ano = new Date(data).getFullYear()
    const favorito = false 

    const elementoCardFilme = document.createElement("section")
    elementoCardFilme.classList.add("filmes__card-filme")
    elementoContainerFilmes.appendChild(elementoCardFilme);

    const elementoImagemFilme = document.createElement("img")
    elementoImagemFilme.setAttribute("src", `${IMG_URL}${imagem}`)
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
    elementoImagemFavorito.setAttribute("src", favorito ? "./images/Heart-fill.svg" : "./images/Heart.svg")
    elementoImagemFavorito.setAttribute("alt", "Ícone de favorito")
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
