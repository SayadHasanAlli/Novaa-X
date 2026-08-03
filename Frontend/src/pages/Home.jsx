import hero from "../assets/hero.png";
import GuildStats from "../components/GuildStats";
import TopPerformers from "../components/TopPerformers";
import { GUILD } from "../data/config";
import { useEffect } from "react";
import api from "../api/api.js";


function Home() {
  useEffect(() => {

        async function testBackend() {

            try {

                const res = await api.get("/matches/");

                console.log(res.data);

            } catch (err) {

                console.error(err);

            }

        }

        testBackend();

    }, []);
  return (
    <main className="bg-[#05070D] text-white min-h-screen">

      
      <section className="px-6 pt-5">
        <div className="flex flex-col items-center">

          <img
            src={hero}
            alt="NOVAA X"
            className="w-60 md:w-72 object-contain"
          />

          <h1 className="mt-6 text-5xl font-black tracking-wider">
            <span className="text-white">NOVAA </span>
            <span className="text-sky-400">X</span>
          </h1>

    
          <p className="mt-3 text-sky-400 tracking-[4px] text-sm">
            {GUILD.motto}
          </p>

          
          <p className="mt-6 max-w-md text-center text-gray-300 leading-7">
            {GUILD.heroDescription}
          </p>

          
          <button
            className="
            mt-8
            px-8
            py-3
            rounded-xl
            bg-sky-500
            hover:bg-sky-600
            transition
            font-semibold
            "
          >
            {GUILD.heroButton}
          </button>

        </div>

      </section>

      <GuildStats />
      <TopPerformers />

    </main>
    
  );
}

export default Home;