import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-night px-5 text-center text-white">
      <p className="eyebrow text-aqua">Error 404</p>
      <h1 className="heading-2">Esta página no existe.</h1>
      <Link href="/" className="btn-primary">
        Volver al inicio
      </Link>
    </main>
  );
}
