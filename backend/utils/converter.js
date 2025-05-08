export function parsePrice(value) {
  if (!value || value.toLowerCase().includes("out of stock")) return "Out Of Stock";

  // Remove non-numeric characters (keep digits and dots only)
  const cleaned = value.replace(/[^\d.]/g, "");
  const number = parseFloat(cleaned);

  return isNaN(number) ? "Out of Stock" : number;
}
