import Layout from "../components/Layout";
import {useState} from 'react'
import Pokemon from "../components/Pokemon"
import SearchMons from '../components/SearchMons';

const offsetAmount = 50;

export default function Home({monList, fullDex}) {
  //Grid List of Pokemon
  const [pokemon, setPokemon] = useState(monList)
  //Offsetting Mon IDs
  const [offset, setOffset] = useState(0)

  /*const fetchNames = async(url) => {
    const response = await fetch(url);
    const allNames = await response.json();

  }*/

  const fetchPokemon = async (url, next) => {
    const response = await fetch(url);
    const nextMon = await response.json();
    setOffset(next ? offset + offsetAmount : offset - offsetAmount)
    setPokemon(nextMon)
  }

  return (
      <Layout title={"Pokédex"} dex={fullDex}>
        <div className="flex flex-row justify-center">
        <button disabled={!pokemon.previous} className="rounded-md h-9 disabled:bg-gray-500 px-3 py-1 mt-3 bg-slate-300" onClick={() => fetchPokemon(pokemon.previous, false)}>Prev</button>
        <SearchMons dex = {fullDex}></SearchMons>
      <button disabled={!pokemon.next} className="rounded-md h-9 disabled:bg-gray-500 px-3 py-1 mt-3 bg-slate-300" onClick={() => fetchPokemon(pokemon.next, true)}>Next</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {pokemon.results.map((mon, i) => (
          <Pokemon key={i} pokemon={mon} index = {i + offset}></Pokemon>
        ))}
      </div>

      <div className='mt-10 flex justify-center gap-5'>
        <button disabled={!pokemon.previous} className="disabled:bg-gray-500 px-3 py-1 bg-slate-300" onClick={() => fetchPokemon(pokemon.previous, false)}>Prev</button>
        <button disabled={!pokemon.next} className="disabled:bg-gray-500 px-3 py-1 bg-slate-300" onClick={() => fetchPokemon(pokemon.next, true)}>Next</button>
      </div>
      </Layout>
    )
}

export async function getServerSideProps() {
  const [smallList, largeList] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${offsetAmount}`), //to display
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1279")
  ])
  const [monList, fullDex] = await Promise.all([
    smallList.json(), 
    largeList.json()
  ])
  return { 
    props: { monList, fullDex } 
  };
}