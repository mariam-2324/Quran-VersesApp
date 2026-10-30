import { useEffect, useState } from 'react'
import './App.css'

function App() {

  // States

  const [ayat, setAyat] = useState(null);
  const [ayatNum, setAyatNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Logic

  const searchRandomAyat = async (ayatNumber) =>{

    // 1 se kam ya 6236 se zyada number ho to fetch hi nahi karna
    if (!ayatNumber || ayatNumber < 1 || ayatNumber > 6236) {
      setAyat(null);
      setError("Your entered number doesn't exist in our Quranic Ayat App");
      setLoading(false);
      return;
    }

    try {

      const response = await fetch(`https://api.alquran.cloud/v1/ayah/${ayatNumber}/ar.alafasy`);

      if (response.ok) {
        const result = await response.json()
        setAyat(result.data);
        setError("");
      }
      else{
        throw new Error("Failed to Fetch Ayat")
      }
    } catch (error) {
      setError(error.message);
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchAyat = async () => {
      setLoading(true);
      await searchRandomAyat(ayatNum);
    };

    fetchAyat();
  }, [ayatNum]);

  return (
    <>
      <section id="center" className="relative w-full h-screen overflow-hidden">

  {/* Image ab background ki tarah poore section par phaili hai */}
  <img
    src="/quranApp1.jpg"
    alt=""
    className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
  />

  {/* Saara content ek hi column mein, bilkul center mein */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full gap-5 text-center px-4">

    <h2 className="bg-gradient-to-r from-rose-900 to-mauve-900 bg-clip-text text-transparent text-5xl font-bold ">Search Quran Ayat</h2>

    <div className="flex items-center gap-4">
      <input
        type="number"
        onChange={(e)=> {setAyatNum(parseInt(e.target.value || '0'))}}
        placeholder='Enter Ayat Number'
        className="p-3 bg-white border-3 border-amber-800 rounded-md"
      />
      <button
        onClick={ ()=> {searchRandomAyat(ayatNum)} }
        className="border-4 border-amber-800 rounded-md p-3 w-50 font-bold text-2xl transition-colors duration-200 hover:bg-blue-700 hover:text-gray-100"
      >
        Search
      </button>
    </div>

    <p style={{color: 'red'}}>{error}</p>

    {ayat !== null ? (
      <div className="bg-orange-300/80 rounded-lg p-4 max-w-3xl">
        <h2 className="text-3xl font-bold">{ayat.text}</h2>
        <br />
        <p>{ayat.surah.name} | {ayat.surah.number} </p>
      </div>
    ) : (
      <p>{loading ? 'Loading Ayat...' : 'No Ayat found.'}</p>
    )}

  </div>
</section>
    </>
  )
}

export default App
