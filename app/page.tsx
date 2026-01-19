import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <main className="relative flex h-screen flex-col bg-rich-black overflow-hidden">
      {/* Logo centrado arriba */}
      <header className="relative z-10 w-full pt-12 pb-4">
        <p className="text-center text-white text-lg tracking-wide">
          segudigital
        </p>
      </header>

      {/* Smartphone mockup - área central flexible */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[280px] mx-auto">
          {/* Gradient overlay para fade del mockup */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-rich-black via-rich-black/70 to-transparent pointer-events-none" />

          {/* Smartphone image */}
          <Image
            src="/images/smartphone-mockup.png"
            alt="SeguDigital App"
            width={400}
            height={800}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Contenido inferior - fixed en la parte baja */}
      <div className="relative z-20 px-6 pb-10 pt-4 space-y-5 bg-gradient-to-t from-rich-black via-rich-black to-transparent">
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
