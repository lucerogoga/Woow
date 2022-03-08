export function ccyFormat(num) {
  return `$ ${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

export function createData(name, observation, qty, unitPrice) {
  const sum = priceRow(qty, unitPrice);
  return { name, observation, qty, unitPrice, sum };
}

export function total(items) {
  return items.map(({ sum }) => sum).reduce((sum, i) => sum + i, 0);
}
