import React, { useState } from "react";
import {
  Container,
  LogoContainer,
  Menu,
  MenuItem,
  MenuItemLink,
  Wrapper,
  BurgerContainer,
  leftContainer,
  BurgerIconContainer,
  DropdownContainer,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  // userContainer,
} from "../Assets/NavBar.elements";
import LogoWoowRotate from "./LogoWoow";
// todo lo que englobe iconos podemos darle unos estilos globales
import { iconContext } from "react-icons";
// ! ----------
import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
// import MenuBurger from "../Assets/icons/MenuBurger";
// import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
import { useAuth } from "./Context/AuthContext";

import { Link } from "react-router-dom";

const NavBar2 = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Container>
      <Wrapper>
        {/* Con esto podemos hacer que todos los iconos tengan el mismo tamaño */}
        {/* <iconContext.Provider value={{ style: { fontSize: "2em" } }}> */}

        {/* <leftContainer> */}
        <div style={{ display: "flex" }}>
          <BurgerIconContainer>
            <MenuBurger onClick={() => setOpen(!open)} />
          </BurgerIconContainer>

          <LogoContainer>
            {/* <LogoWoow /> */}
            <LogoWoowRotate
              className="navBar--logo"
              fill="#fff"
              width="80"
              height="80"
            />
          </LogoContainer>
        </div>

        {open && (
          <DropdownContainer>
            <DropdownHeader>
              <span onClick={() => setOpen(false)}>X</span>
            </DropdownHeader>

            <DropdownMenu>
              <DropdownItem>
                <MenuItemLink>
                  <Link to={"/"}>Home</Link>
                </MenuItemLink>
              </DropdownItem>
              <DropdownItem>
                <MenuItemLink>
                  <Link to={"/"}>Take Order</Link>
                </MenuItemLink>
              </DropdownItem>
              <DropdownItem>
                <MenuItemLink>Order Resume</MenuItemLink>
              </DropdownItem>
              <DropdownItem>
                {/* <MenuItemLink>Logout</MenuItemLink> */}
                <button onClick={handleLogout}>Logout</button>
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>
        )}

        {/* </leftContainer> */}

        <Menu>
          <MenuItem>
            <MenuItemLink>
              <Link to={"/si"}>Home</Link>
            </MenuItemLink>
          </MenuItem>
          <MenuItem>
            <MenuItemLink>Order Resume</MenuItemLink>
          </MenuItem>
        </Menu>

        {/* Iconos que no son de la lista */}

        <div style={{ display: "flex" }}>
          <Link className="navBar--link cart" to={"/waiter/order-cart"}>
            <ShoppingCart />
            {/* ! acomodar */}
            <span className="cart--number">3</span>
          </Link>

          {/* <div className="user-photo"> */}

          <userContainer>
            <Chef />
          </userContainer>

          {/* </div> */}
        </div>

        {/* </iconContext.Provider> */}
      </Wrapper>
    </Container>
  );
};

export default NavBar2;
