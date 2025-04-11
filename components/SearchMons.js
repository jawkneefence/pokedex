import React from 'react'
import Link from 'next/link'
import {useState, useEffect} from 'react'
  
const SearchMons = ({dex}) => {
    const allNames = dex.results.map(data => data.name.toUpperCase())

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
        <div class='pt-3 pb-6'>
        <div class='flex justify-center'>
        <input type="text" class = 'rounded-md h-10 bg-neutral-200 text-black text-center w-9/12 md:w-11/12 lg:w-96' value = {searchQuery} onChange = {(e) => setQuery(e.target.value)} placeholder="Search Pokemon">
        </input>
        </div>
        <div class = "text-amber-200 gap-2 bg-slate-700 mt-1 mx-auto w-9/10 rounded-md">
            {suggestions.map(sugg => <div class = 'flex justify-center py-1'><Link href={`/pokemon/${sugg}`}>{sugg}</Link></div>)}
        </div>
      </div>
      
    )
}

export default SearchMons;