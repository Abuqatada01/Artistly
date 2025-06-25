import { Mic, Music, Speaker, Disc3 } from "lucide-react";

const iconMap = {
  Singers: <Mic className="w-8 h-8 text-white" />,
  Dancers: <Music className="w-8 h-8 text-white" />,
  Speakers: <Speaker className="w-8 h-8 text-white" />,
  DJs: <Disc3 className="w-8 h-8 text-white" />,
};

const bgMap = {
  Singers: "from-pink-500 to-red-500",
  Dancers: "from-purple-500 to-indigo-600",
  Speakers: "from-yellow-500 to-orange-500",
  DJs: "from-green-500 to-teal-500",
};

export default function CategoryCard({ title }) {
  return (
    <div
      className={`rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-white bg-gradient-to-br ${bgMap[title]} hover:scale-105 transition-transform`}
    >
      <div className="mb-4">{iconMap[title]}</div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  );
}
