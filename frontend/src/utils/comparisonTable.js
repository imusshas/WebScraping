export function comparisonTable(products) {
  const uniqueKeys = Array.from(
    new Set(products.flatMap(product => { 
      return Object.keys(product.attributes) }))
  );

  // Output for table comparison:
  return uniqueKeys.map(key => {
    const row = { attribute: key };
    products.forEach((product, i) => {
      row[`product${i + 1}`] = product.attributes[key] || "—";
    });
    return row;
  });

}