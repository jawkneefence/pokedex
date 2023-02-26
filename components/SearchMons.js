import React from 'react'
import Link from 'next/link'
import {useState, useEffect} from 'react'
  
const SearchMons = ({dex}) => {
    const allNames = dex.results.map(data => data.name)

    function getSuggestions(query) {
        return new Promise((resolve, reject) => {
            resolve(
                allNames.filter((name) =>
                    name.toLowerCase().includes((query.toLowerCase()))
                )
            )
        })
    }

    //Searchbar states
    const [searchQuery, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    //const [searchSelection, setSelection] = useState("");
    console.log(searchQuery)

    //instantly invoked function for setting suggestions
    useEffect(() => {
        (async () => {
            if(!searchQuery) return
            const data = await getSuggestions(searchQuery);
            setSuggestions(data)
        })();
    }, [searchQuery]); //re-run this function every time searchQuery changes

    return (
        //(e) is the text-input event. suggestions listed below as value changes
        <div className='pt-3 pb-6'>
        <div className='flex justify-center'>
        <input type="text" className = 'rounded-md w-80 h-10 bg-neutral-200 text-black text-center' value = {searchQuery} onChange = {(e) => setQuery(e.target.value)} placeholder="Search a Name">
        </input>
        </div>
        <div className = "text-amber-200 gap-2 bg-slate-700 mt-1 mx-auto w-96 rounded-md">
            {suggestions.map(sugg => <div className = 'flex justify-center py-1'><Link href={`/pokemon/${sugg}`}>{sugg}</Link></div>)}
        </div>
      </div>
      
    )
}

export default SearchMons;