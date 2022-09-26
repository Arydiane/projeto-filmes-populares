export function getFilmesFavortiosLocalStorage(){
    return JSON.parse(localStorage.getItem('filmesFavoritos'))
  }

export function setFilmesFavoritosLocalStorage(listafilmes){
    localStorage.setItem('filmesFavoritos', JSON.stringify(listafilmes))
  }

export function salvaFilmeFavoritoLocalStorage(filme) {

    const filmesFavoritos =  getFilmesFavortiosLocalStorage() || []
    filmesFavoritos.push(filme)
    setFilmesFavoritosLocalStorage(filmesFavoritos)

  }

export function retiraFilmeFavoritoLocalStorage(id) {

    const filmesFavoritos =  getFilmesFavortiosLocalStorage() || []
    const posicaoFilme = filmesFavoritos.findIndex( elemento => elemento.id == id)
    
    if (posicaoFilme != -1){
      filmesFavoritos.splice(posicaoFilme, 1)
      setFilmesFavoritosLocalStorage(filmesFavoritos)
    }
  }

export function verificaPertenceFilmeFavorito(id){
    const filmesFavoritos =  getFilmesFavortiosLocalStorage() || []
    return filmesFavoritos.find(elemento => elemento.id == id)
  }