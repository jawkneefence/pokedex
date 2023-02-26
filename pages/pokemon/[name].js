import React from 'react'
import Layout from '../../components/Layout'
import Image from 'next/image'

const Pokemon = ({mon}) => {
    const newIndex = ('000' + (mon.id)).slice(-3)
    const pokeName = mon.name[0].toUpperCase() + mon.name.slice(1)

    const renderTypes = () => (
        mon.types.map(type => (
            <li key = {type.slot} className = 'px-2 py-1 bg-slate-500 rounded-lg'>
                <span className = "text-zing-300">{type.type.name.toUpperCase()}</span>
            </li>
        ))
    )

    const renderStats = () => (
        mon.stats.map((stat, index) => (
            <div className='bg-neutral-400 my-1 p-1 rounded-lg text-neutral-300'>
                <div className='bg-indigo-800 rounded-lg' style={{width: `${stat.base_stat/1.75}%`}}>
                    <span key = {index} className = 'text-neutral-400 pr-4 pl-1'>{stat.stat.name.toUpperCase()}</span>
                    <span className = "text-neutral-200" >{stat.base_stat}</span>
                </div>
            </div>
        ))
    )
        
    //type-color matching
    let bgcolor = "";
    const currType = mon.types[0].type.name;

    if(currType=="fire")
    bgcolor = "bg-rose-700"
    else if (currType=="grass")
    bgcolor = "bg-emerald-700"
    else if (currType=="normal")
    bgcolor = "bg-teal-200"
    else if (currType=="water")
    bgcolor = "bg-blue-600"
    else if (currType=="electric")
    bgcolor = "bg-yellow-400"
    else if (currType=="ice")
    bgcolor = "bg-cyan-400"
    else if (currType=="fighting")
    bgcolor = "bg-stone-700"
    else if (currType=="poison")
    bgcolor = "bg-purple-700"
    else if (currType=="ground")
    bgcolor = "bg-amber-800"
    else if (currType=="flying")
    bgcolor = "bg-sky-400"
    else if (currType=="psychic")
    bgcolor = "bg-pink-600"
    else if (currType=="rock")
    bgcolor = "bg-orange-900"
    else if (currType=="bug")
    bgcolor = "bg-amber-500"
    else if (currType=="ghost")
    bgcolor = "bg-stone-900"
    else if (currType=="dark")
    bgcolor = "bg-stone-800"
    else if (currType=="dragon")
    bgcolor = "bg-rose-900"
    else if (currType=="steel")
    bgcolor = "bg-stone-500"
    else if (currType=="fairy")
    bgcolor = "bg-pink-400"
    else bgcolor="bg-slate-800"

    return (
        <Layout title={pokeName}>
            <div className = 'flex flex-col justify-center items-center pb-10'>
            <span className='left-20 absolute text-[10rem] font-bold text-slate-300 text-opacity-20'>#{newIndex}</span>
            <Image 
                    alt={pokeName}
                    width={300}
                    height={300}
                    quality={100}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${newIndex}.png`}>
            </Image>
            <span className='font-bold text-[1.3rem] text-slate-400'>Weight: {mon.weight}lbs.</span>
            </div>

            <div className={`m-1 p-5 bg-slate-800`}>
                <ul className='flex gap-5'>
                    {renderTypes()}
                </ul>
            </div>

            <div className={`m-1 p-10 ${bgcolor}`}>
                Base Stats
                {renderStats()}
            </div>
        </Layout>
    )
}

export default Pokemon;

export async function getServerSideProps(context) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.query.name}`)
    const mon = await response.json()
    return {
        props: {mon}
    }
}