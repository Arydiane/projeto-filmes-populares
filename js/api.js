import { API_KEY, BASE_URL_POLULAR, BASE_URL_BUSCA, language} from "./api-key.js"

export async function buscarFilmePorTitulo(tituloFilme) {
    
    const url = `${BASE_URL_BUSCA}?${API_KEY}&${language}&query=${tituloFilme}&page=1&include_adult=false`
    const resposta = await fetch(url)
    const { results } = await resposta.json()
    return results
}

export async function getFilmesPopulares() {
  
    const url = `${BASE_URL_POLULAR}?${API_KEY}&${language}&page=1`
    const resposta = await fetch(url)
    const { results } = await resposta.json()
    return results
}