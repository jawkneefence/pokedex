import React from 'react'
import Layout from '../../components/Layout'
import Image from 'next/image'

const Pokemon = ({mon}) => {
    const newIndex = ('000' + (mon.id)).slice(-3)
    const prevolutionIndex = ('000' + (mon.id-1)).slice(-3)
    const pokeName = mon.name[0].toUpperCase() + mon.name.slice(1)

    console.log(mon)

    const renderTypes = () => (
        mon.types.map(type => (
            <li key = {type.slot} className = 'px-2 py-1 bg-slate-600 rounded'>
                {type.type.name.toUpperCase()}
            </li>
        ))
    )

    const renderStats = () => (
        mon.stats.map((stat, index) => (
            
            <div className='bg-neutral-400 my-1 p-1 rounded text-neutral-300'>
                <div className='bg-slate-800 rounded' style={{width: `${stat.base_stat/1.5}%`}}>
                    <span key = {index} className = 'pr-4 pl-1'>{stat.stat.name.toUpperCase()}</span>
                    {stat.base_stat}
                </div>
            </div>
        ))
    )

    return (
        <Layout title={pokeName}>
            <div className = 'flex flex-col justify-center items-center'>
            <span className='absolute text-[12rem] font-bold text-slate-400'>#{newIndex}</span>
            <Image 
                    alt={pokeName}
                    width={250}
                    height={250}
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${newIndex}.png`}>
            </Image>
            Weight: {mon.weight}
            </div>

            <div className='bg-slate-700 rounded p-5'>
                <ul className='flex gap-5'>
                    {renderTypes()}
                </ul>
            </div>

            <div className='bg-slate-600 rounded p-5'>
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