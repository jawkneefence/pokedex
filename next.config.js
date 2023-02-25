/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.pokemon.com', 'img.pokemondb.net']
  }
}

module.exports = nextConfig
