import Layout from "../components/Layout";
import {useState} from 'react'
import Pokemon from "../components/Pokemon"

export default function Home({monList}) {
  //Grid List of Pokemon
  const [pokemon, setPokemon] = useState(monList)
  //Offsetting Mon IDs
  const [offset, setOffset] = useState(0)
  //Searchbar state
  const [searchInput, setSearchnput] = useState("");


  const fetchPokemon = async (url, next) => {
    const response = await fetch(url);
    const nextMon = await response.json();
    setOffset(next ? offset+20 : offset-20)
    setPokemon(nextMon)
  }

  return (
      <Layout title={"Pokédex"}>
        <div>
          <input type="text" placeholder="Search a name">
          </input>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {pokemon.results.map((mon, i) => (
          <Pokemon key={i} pokemon={mon} index = {i + offset}></Pokemon>
        ))}
      </div>

      <div className='mt-10 flex justify-center gap-5'>
        <button disabled={!pokemon.previous} className="disabled:bg-gray-500 px-3 py-1 bg-slate-900" onClick={() => fetchPokemon(pokemon.previous, false)}>Prev</button>
        <button disabled={!pokemon.next} className="disabled:bg-gray-500 px-3 py-1 bg-slate-900" onClick={() => fetchPokemon(pokemon.next, true)}>Next</button>
      </div>
      </Layout>
    )
}

export async function getStaticProps(context) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=45");
  const monList = await response.json();

  return {
    props: {monList}
  }
}