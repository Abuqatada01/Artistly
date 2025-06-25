import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-r from-teal-100 to-teal-300 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">
        Discover & Book Talented Artists
      </h1>
      <p className="text-lg max-w-2xl mx-auto mb-6">
        Artistly connects event planners with verified singers, dancers,
        speakers, and DJs.
      </p>
      <Link
        href="/artists"
        className="inline-block px-6 py-3 bg-teal-700 text-white font-semibold rounded-lg shadow-md hover:bg-teal-800 transition"
      >
        Explore Artists
      </Link>
    </section>
  );
}
