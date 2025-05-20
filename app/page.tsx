import Navbar from '@/components/Navbar'

export default async function Home() {
  return (
    <div className="relative h-[200vh] ">
      <Navbar />
      <div className="h-[70vh] bg-[url(/homepage-bg.jpg)] bg-cover bg-repeat-x animate-bg-move flex items-center justify-center shadow-xl shadow-foreground/10">
        <h1 className="font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl opacity-90  ">
          Welcome to my Forum
        </h1>
      </div>

      <div className="h-[30vh] flex items-center justify-center">
        <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-foreground ">
          The best forum under the sun
        </h2>
      </div>

      <div></div>
    </div>
  )
}
