const elementoContainerFilmes = document.getElementById('filmes-container')

const filmes = [
    {
      image: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
      title: 'Batman',
      rating: 9.2,
      year: 2022,
      description: "Descrição do filme…",
      isFavorited: true,
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
      title: 'Avengers',
      rating: 9.1,
      year: 2019,
      description: "Descrição do filme…",
      isFavorited: false
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
      title: 'Doctor Strange',
      rating: 9.5,
      year: 2022,
      description: "Descrição do filme…",
      isFavorited: false
    },
  ]
  
  filmes.forEach(filme => renderizarFilme(filme))

  function renderizarFilme(filme) {
    const {image:imagem, title:titulo, rating:classificacao, year:ano, description:resumo, isFavorited:favorito} = filme

    const elementoCardFilme = document.createElement("section")
    elementoCardFilme.classList.add("filmes__card-filme")
    elementoContainerFilmes.appendChild(elementoCardFilme);

    const elementoImagemFilme = document.createElement("img")
    elementoImagemFilme.setAttribute("src", imagem)
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

