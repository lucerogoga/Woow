// import styled from "styled-components";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 70px;
  //   background-color: #800;
  position: relative;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  //   margin: auto;
`;

// ! por qué no funciona?
export const leftContainer = styled.div`
  height: 100%;
  display: flex;
  background: yellow;
`;

// export const BurgerContainer = styled.div`
//   margin-left: 0.5rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: aqua;
//   height: 100%;
// `;

export const LogoContainer = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  //   background: aqua;
  height: 100%;

  path {
    fill: #283159;
    width: 10;
  }
`;

export const Menu = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin-left: 30px;
  @media (max-width: 768px) {
    display: none;
  }
`;

// @media screen and (max-width: 960px) {
export const DropdownContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 135px;
  //   left: 0;
  //   width: 65%;
  width: 100%;
  height: 90vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transition: 0.5s all ease;
  width: 300px;
  background: green;
  z-index: 1;
  padding: 1rem;
  background: #ffefc0;
  transform: translateX(-45%);
`;

export const DropdownHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;
// export const Menu = styled.ul`
//   height: 100%;
//   display: flex;
//   justify-content: space-between;
//   list-style: none;
// `;

export const DropdownMenu = styled.div`
  height: 250px;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
`;

export const DropdownItem = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  transition: background 0.5s;
  padding: 0.5rem;
`;

export const MenuItem = styled.li`
  height: 100%;
`;

// ! Revisar en case que desee cambiarlo a LINK de React
export const MenuItemLink = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding: 0.5rem 2.5rem;
  color: #283159;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  transition: 0.5s all ease;

  &:hover {
    color: #ccc;
    background-color: 283159;
    transition: 0.5 all ease;
  }
`;

// @media screen and (max-width: 960px) {
export const BurgerIconContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    align-items: center;
    // background: aqua;
    cursor: pointer;
    margin-left: 0.5rem;
    display: flex;
    justify-content: center;
    height: 100%;

    path {
      fill: #283159;
      margin-right: 0.5rem;
    }
  }
`;

export const userContainer = styled.div`
  background-color: blue;
  /* background-color: #fff; */
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;

  path {
    fill: red;
  }
`;
