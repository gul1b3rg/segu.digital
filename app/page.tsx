import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <main className="relative h-screen bg-rich-black overflow-hidden">
      {/* Logo centrado arriba */}
      <header className="relative z-10 w-full pt-12 pb-4">
        <p className="text-center text-white text-lg tracking-wide">
          segudigital
        </p>
      </header>

      {/* Smartphone mockup - altura limitada con fade */}
      <div className="absolute inset-x-0 top-20 flex justify-center h-[55vh]">
        <div className="relative w-full max-w-[280px] h-full overflow-hidden">
          {/* Gradient overlay - fade en la mitad inferior */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-30% via-rich-black/70 via-60% to-rich-black pointer-events-none" />

          {/* Smartphone image */}
          <Image
            src="/images/smartphone-mockup.png"
            alt="SeguDigital App"
            width={400}
            height={800}
            className="w-full h-auto object-contain object-top"
            priority
          />
        </div>
      </div>

      {/* Contenido inferior - superpuesto sobre el fade */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-10 space-y-5">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Tu seguro en<br />un toque
        </h1>

        {/* Subtítulo */}
        <p className="text-gray-400 text-base leading-relaxed">
          Gestiona tus seguros, cotiza y realiza reclamos desde tu celular
        </p>

        {/* Botón CTA */}
        <Link
          href="/login"
          className="block w-full py-4 px-6 bg-lime-burst text-rich-black text-center font-semibold text-lg rounded-full transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Gestionar seguros
        </Link>
      </div>
    </main>
  )
}
