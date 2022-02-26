import React, { useState } from "react";
import {
  Container,
  LogoContainer,
  Menu,
  MenuItem,
  MenuItemLink,
  Wrapper,
  BurgerIconContainer,
  DropdownContainer,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  UserContainer,
  Block,
  NumberCart,
  StyledLink,
} from "../Assets/NavBar.elements";
import LogoWoowRotate from "./LogoWoow";
import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";
import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
import { ReactComponent as More } from "../Assets/icons/more.svg";
// !----
import { ReactComponent as LogoWoow } from "../Assets/logo-woow.svg";
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

        <Block style={{ marginLeft: "1rem" }}>
          <BurgerIconContainer>
            <MenuBurger width={30} onClick={() => setOpen(!open)} />
          </BurgerIconContainer>

          <LogoContainer style={{ marginLeft: "18px" }}>
            <LogoWoow width="70" height="70" />
            {/* <LogoWoowRotate width="70" height="70" /> */}
          </LogoContainer>
        </Block>

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
              <StyledLink to={"/si"}>Home</StyledLink>
              {/* <Link to={"/si"}>Home</Link> */}
            </MenuItemLink>
          </MenuItem>
          <MenuItem>
            <MenuItemLink>Order Resume</MenuItemLink>
          </MenuItem>
        </Menu>

        <Block style={{ marginRight: "1rem" }}>
          <div style={{ position: "relative" }}>
            <Link to={"/waiter/order-cart"}>
              <ShoppingCart fill="#fff" width={30} />
              <NumberCart>3</NumberCart>
            </Link>
          </div>
          <div style={{ marginLeft: "15px" }}>
            <UserContainer>
              <Waiter width={30} />
              {/* <Chef width={30} /> */}
            </UserContainer>
          </div>
        </Block>
      </Wrapper>
    </Container>
  );
};

export default NavBar2;
