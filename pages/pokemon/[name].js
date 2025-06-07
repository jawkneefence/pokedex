import React from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

const Pokemon = ({ mon, monSpecies }) => {
  let newIndex = 0;
  if (mon.id > 998) {
    newIndex = ("000" + mon.id).slice(-4);
  } else {
    newIndex = ("000" + mon.id).slice(-3);
  }
  const pokeName = mon.name[0].toUpperCase() + mon.name.slice(1);

  const formatStat = (statName) => {
    if (statName == "SPECIAL-ATTACK") {
      return "SP.ATK";
    }
    if (statName == "SPECIAL-DEFENSE") {
      return "SP.DEF";
    }
    if (statName == "ATTACK") {
      return "ATK";
    }
    if (statName == "DEFENSE") {
      return "DEF";
    }
    if (statName == "SPEED") {
      return "SPD";
    }
    if (statName == "HP") {
      return statName;
    }
  };
  //type-color matching
  const getbgColor = (currType) => {
    //const currType = mon.types[0].type.name;
    if (currType == "FIRE") return "bg-rose-700";
    else if (currType == "GRASS") return "bg-emerald-700";
    else if (currType == "NORMAL") return "bg-orange-300";
    else if (currType == "WATER") return "bg-blue-600";
    else if (currType == "ELECTRIC") return "bg-yellow-400";
    else if (currType == "ICE") return "bg-cyan-400";
    else if (currType == "FIGHTING") return "bg-red-900";
    else if (currType == "POISON") return "bg-purple-700";
    else if (currType == "GROUND") return "bg-amber-800";
    else if (currType == "FLYING") return "bg-sky-400";
    else if (currType == "PSYCHIC") return "bg-pink-600";
    else if (currType == "ROCK") return "bg-orange-900";
    else if (currType == "BUG") return "bg-amber-500";
    else if (currType == "GHOST") return "bg-violet-900";
    else if (currType == "DARK") return "bg-stone-800";
    else if (currType == "DRAGON") return "bg-rose-900";
    else if (currType == "STEEL") return "bg-stone-500";
    else if (currType == "FAIRY") return "bg-pink-400";
  };

  const renderTypes = () =>
    mon.types.map((type) => (
      <li
        key={type.slot}
        className={`px-2 py-1 rounded-lg ${getbgColor(
          type.type.name.toUpperCase()
        )}`}
      >
        <span className="text-neutral-300">{type.type.name.toUpperCase()}</span>
      </li>
    ));

  const renderStats = () =>
    mon.stats.map((stat, index) => (
      <div className="bg-neutral-500 my-1 p-1 rounded-lg text-neutral-300">
        <div
          className="bg-emerald-800 rounded-lg w-max-100"
          style={{
            width: `${
              stat.base_stat < 169
                ? stat.base_stat / 1.6
                : stat.base_stat / 2.25
            }%`,
          }}
        >
          <span key={index} className="text-neutral-400 ml-1">
            {formatStat(stat.stat.name.toUpperCase())}
          </span>
          <span className="ml-1 text-slate-200">{stat.base_stat}</span>
        </div>
      </div>
    ));
  //EXTRACTING FLAVOR-TEXT
  const [randomFT, setrandomFT] = useState("");
  const flavorTexts = [];
  useEffect(() => {
    monSpecies.flavor_text_entries.forEach((ft) => {
      if (ft.language.name == "en") {
        flavorTexts.push(ft);
      }
    });
    setrandomFT(
      flavorTexts[Math.floor(Math.random() * flavorTexts.length)].flavor_text
    );
  });
  console.log("randomFT: ", randomFT);

  return (
    <Layout title={pokeName}>
      <div className="flex flex-col justify-center items-center mx-2 pb-5">
        <span className="text-[4rem] font-bold text-slate-300 text-opacity-20">
          #{newIndex}
        </span>
        <motion.div>
        <Tilt
        options={{
          max: 20,
          scale: 1,
          speed: 250,
        }}>
          <div>
            <Image
              alt={pokeName}
              width={300}
              height={300}
              quality={100}
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${newIndex}.png`}
            ></Image>
          </div>
          </Tilt>
        </motion.div>
        <span className="font-bold text-[1.2rem] text-slate-400">
          Weight: {mon.weight}lbs.
        </span>
        <span className="mt-2 font-bold text-[1.5rem] text-slate-300">
          {randomFT}
        </span>
        <div className="m-1 mt-2 p-3 bg-neutral-600 rounded-lg w-1/7">
          <ul className="flex gap-5">{renderTypes()}</ul>
        </div>
      </div>
      <div
        className={`m-1 mx-5 pb-10 bg-slate-800 text-neutral-300 font-semibold rounded-lg`}
      >
        Base Stats
        {renderStats()}
      </div>
    </Layout>
  );
};

export default Pokemon;

export async function getServerSideProps(context) {
  const [pokemon, pokemonSpecies] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${context.query.name}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${context.query.name}`),
  ]);
  const [mon, monSpecies] = await Promise.all([
    pokemon.json(),
    pokemonSpecies.json(),
  ]);
  return {
    props: { mon, monSpecies },
  };
}
