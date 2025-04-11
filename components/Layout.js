import React from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link"


const Layout = ({children, title}) => {
    return (
        <div className = "bg-slate-500">
            <Head>
                <title>{title}</title>
                <meta name="description" content="Pokédex site developed by Johnny Chong"/>
            </Head>
            <header className='bg-slate-800 py-10 flex flex-row justify-center'>

            <Link href = "/"> 
                <a className=''>
                    <div className='text-5xl text-amber-400 mt-2'>{title}</div>
                </a>
            </Link>
            </header>

            <main className=" bg-slate-500">
                {children}
            </main>

            <footer className="pt-5 pb-9 container flex justify-center items-center flex-row mx-auto bg-slate-500 gap-3">
                <Link href="http://www.github.com/jawkneefence/pokedex"><button className='rounded-md h-6 px-3 bg-slate-700 text-neutral-300'>Github</button></Link>
                <Link href="https://www.johnnychongdev.site"><button className='rounded-md h-6 px-3 bg-slate-700 text-neutral-300'>Created by Johnny Chong</button></Link>
            </footer>
        </div>
    );
};

export default Layout;
