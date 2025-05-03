import Image from "next/image";

export default function PotionsPage() {
  const potions = [
    {
      name: "Savior Schnapps",
      baseLiquid: "Wine",
      ingredients: ["Nettle", "Belladonna", "Mint"],
      effects: "Allows saving the game",
      difficulty: "Medium",
      image: "KCD2-Savious-Schnapps.jpg"
    },
    {
      name: "Marigold Decoction",
      baseLiquid: "Water",
      ingredients: ["Marigold", "Chamomile", "Nettle"],
      effects: "Restores health over time",
      difficulty: "Easy",
    },
    {
      name: "Bane Potion",
      baseLiquid: "Spirits",
      ingredients: ["Belladonna", "Thistle", "Eyebright"],
      effects: "Poisons enemy",
      difficulty: "Hard",
    },
  ];

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Potions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {potions.map((potion, index) => {
          const imageName = potion.image || `KCD2-${potion.name.replace(/ /g, "-")}.jpg`;
          return (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-4 shadow hover:shadow-lg transition"
            >
              <Image
                src={`/potion-recipes/${imageName}`}
                alt={potion.name}
                width={400}
                height={250}
                className="rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold">{potion.name}</h2>
              <p className="text-sm text-gray-400">Base: {potion.baseLiquid}</p>
              <ul className="mt-2 text-sm">
                {potion.ingredients.map((ing, i) => (
                  <li key={i}>• {ing}</li>
                ))}
              </ul>
              <p className="mt-2 text-green-300 italic">{potion.effects}</p>
              <p className="mt-1 text-sm text-yellow-400">Difficulty: {potion.difficulty}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
