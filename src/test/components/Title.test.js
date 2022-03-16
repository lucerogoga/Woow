import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Title from "../../Components/Title";

// describe("render content", () => {
//   //   const valores = {
//   //     title: "Titulo de prueba",
//   //     quantity: 3,
//   //   };

//   const title = "ayuda";
//   const qty = 3;

//   const view = render(<Title title={title} quantity={qty} />);
//   //   const componentito = render(<Title  title={title} quantity={qty}/>);
//   //   const componentito = render(<Title  title={valores.title} quantity={valores.quantity}/>);

//   console.log(view);

//   expect(view.container).toHaveTextContent(title);
// });
test("render content", () => {
  //   const valores = {
  //     title: "Titulo de prueba",
  //     quantity: 3,
  //   };

  const title = "ayuda";
  const qty = 3;

  //   const view = render(<Title title={title} quantity={qty} />);
  //   //   const componentito = render(<Title  title={title} quantity={qty}/>);
  //   //   const componentito = render(<Title  title={valores.title} quantity={valores.quantity}/>);

  const view = render(<Title title={title} quantity={qty} />);
  //   const componentito = render(<Title  title={title} quantity={qty}/>);
  //   const componentito = render(<Title  title={valores.title} quantity={valores.quantity}/>);
  console.log(view);
});
