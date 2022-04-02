import EyePopover from "../Components/EyePopover";

export function ccyFormat(num) {
  return `$ ${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

export function createData(name, observation, size, qty, unitPrice) {
  const sum = priceRow(qty, unitPrice);
  return { name, observation, size, qty, unitPrice, sum };
}

export const createRows = (orderData) => {
  return orderData.order_products.map((product) => {
    let observation = "";
    let size = "";

    if (product.observation) {
      product.observation.trim() !== ""
        ? (observation = <EyePopover obs={product.observation} />)
        : (observation = "");
    }

    if (product.size) {
      size = `${product.size.split(" ")[0]} pt.`;
    }

    return createData(
      product.product_name,
      observation,
      size,
      product.qty,
      +product.unitCost
    );
  });
};

// totalPrice of all products together
export function total(items) {
  return items.map(({ sum }) => sum).reduce((sum, i) => sum + i, 0);
}

// get format 1 to 0001 for card order number
export const pad = (number, length) => {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
};
