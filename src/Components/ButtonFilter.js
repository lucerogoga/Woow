import Heart from "../Assets/CustomLogo";

export function ButtonFilter(props) {
  //   const { items } = props;
  //   const Hover = () => {
  //     <Heart fill="#fff" />;
  //   };
  return (
    <button className="button-card">
      {/* <img src={Salty} className="button-image" alt="product.name" /> */}
      <Heart fill="#283159" className="button-card" />
      <h3 className="button-card--title">All</h3>
    </button>
  );
}

export default ButtonFilter;
