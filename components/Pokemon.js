import React from 'react'
import Image from 'next/image'
import Link from "next/link"

const Pokemon = ({pokemon, index}) => {
    const newIndex = ('000' + (index + 1)).slice(-3)
    let endeces = 0;
    if(index>998) {
        endeces = ('000' + (index + 1)).slice(-4)
    }
    else endeces = 0;
    return (
        <Link href={`/pokemon/${pokemon.name}`}>
            <a>
                <div className='bg-stone-700 rounded p-5 flex flex-col justify-center items-center relative'>
                { endeces ? 
                <span className='absolute text-3xl text-neutral-400 top-0 right-3 font-bold'>#{endeces}</span>
                : <span className='absolute text-3xl text-neutral-400 top-0 right-3 font-bold'>#{newIndex}</span>
                }
                { endeces ?
                <Image 
                    alt={pokemon.name}
                    width={150}
                    height={150}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${endeces}.png`}>
                </Image>
                :
                <Image 
                    alt={pokemon.name}
                    width={150}
                    height={150}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${newIndex}.png`}>
                </Image>
                }
                <span className='uppercase font-semibold tracking-wider text-amber-400'>{pokemon.name}</span>
                </div>
            </a>
        </Link>
        
    )
}

export default Pokemon;