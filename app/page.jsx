"use client";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import { motion } from "framer-motion";

export default function Home() {
  const categories = ["Singers", "Dancers", "Speakers", "DJs"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Layout>
        <Hero />

        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((title) => (
              <CategoryCard key={title} title={title} />
            ))}
          </div>
        </section>
      </Layout>
    </motion.div>
  );
}
