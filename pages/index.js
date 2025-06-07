import Layout from "../components/Layout";
import {useState} from 'react'
import Pokemon from "../components/Pokemon"
import Searchbar from '../components/Searchbar';

const offsetAmount = 48;

export default function Home({monList, fullDex}) {
  //List State
  const [pokemons48, setPokemons48] = useState(monList);
  //Offsets mon-id#
  const [offset, setOffset] = useState(0);

  //onClick function for prev/next buttons
  //(JSON):{pokemon.previous or pokemon.next}
  //stops at dex entry #1008
  const fetchPokemon = async (url, next) => {
    const response = await fetch(url);
    const nextMons = await response.json();
    
    //next or prev button press? : + or - offset
    setOffset(next ? offset + offsetAmount : offset - offsetAmount)
    console.log('offset: ', offset);
    if(offset > 911) {
      nextMons.next = false;
    }
    setPokemons48(nextMons);
  }

  return (
      <Layout title={"My Pokédex"}> {/*Set Title*/}
        {/*Container Div*/}
        <div className="gap-2 md:gap-20 lg:gap-48 w-full flex flex-row flex-initial flex-nowrap justify-center items-stretch pt-3"> 
        
        {/*Previous Button*/}
        <button disabled={!pokemons48.previous} className="rounded-md bg-orange-300 h-8 disabled:bg-gray-500 px-3 py-1" onClick={() => fetchPokemon(pokemons48.previous, false)}>Prev</button>

        {/*SearchBar*/}
        <Searchbar dex = {fullDex}></Searchbar>

        {/*Next Button*/}
      <button disabled={!pokemons48.next} className="rounded-md bg-orange-300 h-8 disabled:bg-gray-500 px-3 py-1" onClick={() => fetchPokemon(pokemons48.next, true)}>Next</button>
      </div>
        
        {/*Counter*/}
      <div className="w-full flex flex-row justify-center mb-2">
      <span className="font-semibold text-gray-200">{(offset/48)+1}/{(1008/offsetAmount)}</span>
      </div>
      {/*Pokemon Grid*/}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 mx-5">
        {/*Map 48 per page.*/}
        {pokemons48.results.map((mon, i) => (
          <Pokemon key={i} pokemon={mon} index = {i + offset}></Pokemon>
        ))}
      </div>
       {/*Counter*/}
      <div className="w-full flex flex-row justify-center mt-2">
      <span className="font-semibold text-gray-200">{(offset/48)+1}/{(1008/offsetAmount)}</span>
      </div>
      {/*Container Div*/}
      <div className='mt-2 pb-2 flex justify-center gap-7'>
        {/*Previous Button*/}
        <button disabled={!pokemons48.previous} className="rounded-md h-8 disabled:bg-gray-500 px-3  bg-orange-300" onClick={() => fetchPokemon(pokemons48.previous, false)}>Prev</button>
        {/*Next Button*/}
        <button disabled={!pokemons48.next} className="rounded-md h-8 disabled:bg-gray-500 px-3  bg-orange-300" onClick={() => fetchPokemon(pokemons48.next, true)}>Next</button>
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