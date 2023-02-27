import Layout from "../components/Layout";
import {useState} from 'react'
import Pokemon from "../components/Pokemon"
import SearchMons from '../components/SearchMons';

const offsetAmount = 48;

export default function Home({monList, fullDex}) {
  //List of Pokemon
  const [pokemon, setPokemon] = useState(monList)
  //Offsetting Mon IDs
  const [offset, setOffset] = useState(0)

  //onClick function for prev/next buttons
  //url encoded in api response through {pokemon.previous/next}
  //stops at dex entry #1008
  const fetchPokemon = async (url, next) => {
    const response = await fetch(url);
    const nextMon = await response.json();
    setOffset(next ? offset + offsetAmount : offset - offsetAmount)
    if(offset > 911) {
      nextMon.next = false;
    }
    setPokemon(nextMon)
  }

  return (
      <Layout title={"Pokédex"}>
        <div class="gap-2 md:gap-20 lg:gap-60 w-full flex flex-row flex-initial flex-nowrap justify-center items-stretch">
        <button disabled={!pokemon.previous} class="rounded-md h-9 disabled:bg-gray-500 px-3 py-1 mt-3 bg-slate-300" onClick={() => fetchPokemon(pokemon.previous, false)}>Prev</button>
        <SearchMons dex = {fullDex}></SearchMons>
      <button disabled={!pokemon.next} class="rounded-md h-9 disabled:bg-gray-500 px-3 py-1 mt-3 bg-slate-300 " onClick={() => fetchPokemon(pokemon.next, true)}>Next</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {pokemon.results.map((mon, i) => (
          <Pokemon key={i} pokemon={mon} index = {i + offset}></Pokemon>
        ))}
      </div>

      <div class='mt-5 flex justify-center gap-5'>
        <button disabled={!pokemon.previous} class="rounded-md h-9 disabled:bg-gray-500 px-3 py-1 bg-slate-300" onClick={() => fetchPokemon(pokemon.previous, false)}>Prev</button>
        <button disabled={!pokemon.next} class="rounded-md h-9 disabled:bg-gray-500 px-3 py-1 bg-slate-300" onClick={() => fetchPokemon(pokemon.next, true)}>Next</button>
      </div>
      </Layout>
    )
}

export async function getServerSideProps() {
  const [smallList, largeList] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${offsetAmount}`), //to display
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1008")
  ])
  const [monList, fullDex] = await Promise.all([
    smallList.json(), 
    largeList.json()
  ])
  return { 
    props: { monList, fullDex } 
  };
}