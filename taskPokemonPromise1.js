// 1. получить по URL "https://pokeapi.co/api/v2/pokemon/" структуру
// <code>
// <pre>
// {
//     results: Array<{
//         name: string;
//         url: string;
//     }>
// }
// </pre>
// </code>

// 2. По url'ам полученным из предыдущего запроса, получить информацию о каждом покемоне и
// вывести в консоль массив с подробной информацией


const url = 'https://pokeapi.co/api/v2/peokemon/'
async function fetchObjectPokemon() {
    try {
        const objectPokemon = await fetch(url)
        if (!objectPokemon.ok) {
            console.log(`Failed to get list of pokemon ${objectPokemon.status}`)
            // throw new Error(`Failed to get list of pokemon ${objectPokemon.status}`)
        }
        const data = await objectPokemon.json()
        if (!data?.results || !Array.isArray(data.results)) {
            console.log(`Data does not a "result" or is not array`)
            // throw new Error(`Data does not a "result" or is not array`)
        }

        const dataResult = data.results
        const pokemonUrls = dataResult.map(pokemon => {
            if (!pokemon?.url) {
                console.log(`Not URL`)
                // throw new Error(`Not URL`)
            }
            return pokemon.url
        })
        const detailPokemonPromises = pokemonUrls.map(async url => {
            const response = await fetch(url)
            if (!response.ok) {
                console.log(`Unable to retrieve pokemon information ${response.status}`)
                // throw new Error(`Unable to retrieve pokemon information ${response.status}`)
            }
            return await response.json()
        })
        const detailPokemon = await Promise.all(detailPokemonPromises)
        console.log(detailPokemon)
    } catch (error) {
        // console.error(`Error: ${error.message}`)
    }
}
fetchObjectPokemon()