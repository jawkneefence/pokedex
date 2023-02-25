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

            <header className='bg-slate-800 py-10  flex justify-center'>
            <Link href = "/">
                <a className = "mr-10 pr-8">
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
                <a>
                    <div className='text-5xl text-center text-amber-400 mt-5 mr-20 pr-20'>{title}</div>
                </a>
            </Link>
            
            </header>

            <main className=" bg-slate-500">
                {children}
            </main>

            <footer className="py-5 container flex justify-center items-center flex-row mx-auto bg-slate-500 gap-10">
                <Link href="http://www.github.com/jawkneefence"><a>My Github</a></Link>
                <a>Created by Johnny Chong</a>
            </footer>
        </div>
    );
};

export default Layout;
