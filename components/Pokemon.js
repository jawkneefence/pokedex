import React from 'react'
import Image from 'next/image'
import Link from "next/link"

import {Tilt} from "react-tilt";
import { motion } from "framer-motion";
import { zoomIn } from "../utils/motion";

const Pokemon = ({pokemon, index}) => {
    const newIndex = ('000' + (index + 1)).slice(-3)
    let endeces = 0;
    if(index>998) {
        endeces = ('000' + (index + 1)).slice(-4)
    }
    else endeces = 0;
    /*
    const variants = {
        fadeIn: {
            direction: "up",
            type: 'spring',
            delay: index * 0.5,
            duration: 0.75
        },
        zoomIn: {
            delay: 0.1,
            duration: 0.3
        }
    }*/

    return (
        <motion.div variants = {zoomIn(1, 3)}>
      <Tilt
        options={{
          max: 20,
          scale: 1,
          speed: 250,
        }}
        className='bg-slate-700 rounded-lg p-5 flex flex-col justify-center gap-1 items-center relative flex-nowrap'
      >
        <Link href={`/pokemon/${pokemon.name}`}>
            <a>
                { endeces ? 
                <span className='absolute text-3xl text-neutral-400 top-0 right-3 font-bold'>#{endeces}</span>
                : <span className='absolute text-3xl text-neutral-400 top-0 right-3 font-bold'>#{newIndex}</span>
                }
                { endeces ?
                <Image 
                    alt={pokemon.name}
                    width={150}
                    height={150}
                    quality={100}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${endeces}.png`}>
                </Image>
                :
                <Image 
                    alt={pokemon.name}
                    width={150}
                    height={150}
                    quality={100}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${newIndex}.png`}>
                </Image>
                }
                <p className='text-center uppercase font-semibold tracking-wider text-amber-400'>{pokemon.name}</p>
            </a>
        </Link>
        </Tilt>
        </motion.div>
    )
}

export default Pokemon;