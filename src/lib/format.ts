export function formatKES(amount: number): string {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

export function categoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    "mini-teddy-bear": "Mini Teddy Bears",
    "teddy-bear": "Classic Teddy Bears",
    "big-teddy-bear": "Big Teddy Bears",
    "giant-teddy-bear": "Giant Teddy Bears",
    personalized: "Personalized",
  };
  return labels[cat] ?? cat;
}
