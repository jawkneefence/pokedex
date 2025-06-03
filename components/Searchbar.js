import React from 'react'
import Link from 'next/link'
import {useState, useEffect} from 'react'
  
const Searchbar = ({dex}) => {
        //Searchbar states
    const [searchQuery, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

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
    //instantly invoked search input function
    useEffect(() => {
        (async () => {
            if(searchQuery=='') {
                setSuggestions([]);
                console.log('empty query suggestions: ', suggestions);
            }
            else {
                const data = await getSuggestions(searchQuery);
                setTimeout(() => { //search input debounce 300ms
                    setSuggestions(data);
                }, 300)
            }
        })();
    }, [searchQuery]); //re-run this function every time searchQuery changes

    return (
        //(e) is the text-input onChange event
        <div className="mb-1">
        <div className='flex justify-center'>
        <input type="text" className = 'rounded-md h-10 bg-neutral-200 text-black text-center w-9/12 md:w-11/12 lg:w-96' 
        value = {searchQuery} onChange = {(e) => {
            setQuery(e.target.value);
        }} placeholder="Search Pokemon">
        </input>
        </div>
        <div className = "text-amber-200 gap-2 bg-slate-700 mt-1 mx-auto w-9/10 rounded-md">
            {
              suggestions.map(sugg => <div className = 'flex justify-center py-1'><Link href={`/pokemon/${sugg}`}>{sugg}</Link></div>)
            }
        </div>
      </div>
      
    )
}

export default Searchbar;