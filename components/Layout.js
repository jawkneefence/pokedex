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

            <header className='bg-slate-800 py-10 gap-x-96 flex flex-row justify-center'>
            <Link href = "/">
                <a className = "absolute left-5">
                <Image
                    alt="home_img"
                    width={80}
                    height={80}
                    src={'https://cdn-icons-png.flaticon.com/512/25/25694.png'}
                    >    
                </Image>
                </a>
            </Link>
            <Link href = "/"> 
                <a className=''>
                    <div className='text-5xl text-amber-400 mt-5'>{title}</div>
                </a>
            </Link>
            
            </header>

            <main className=" bg-slate-500">
                {children}
            </main>

            <footer className="py-5 container flex justify-center items-center flex-row mx-auto bg-slate-500 gap-3">
                <Link href="http://www.github.com/jawkneefence/pokedex"><button className='rounded-md h-6 px-3 bg-slate-700 text-neutral-300'>Github</button></Link>
                <a className='rounded-md h-6 px-3 bg-slate-700 text-neutral-300'>Created by Johnny Chong</a>
            </footer>
        </div>
    );
};

export default Layout;
