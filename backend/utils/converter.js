export function parsePrice(value) {
  if (!value || value.toLowerCase().includes("out of stock")) return "Out Of Stock";

  // Remove non-numeric characters (keep digits and dots only)
  const cleaned = value.replace(/[^\d.]/g, "");
  const price = parseFloat(cleaned);

  return isNaN(price) || price === 0 ? "Out of Stock" : price;
}
