import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap'
import Logo from '../../logo.svg'
import Link from 'next/link'
import UserMenu from "../user/UserMenu"

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="light" light expand="md">
        <div className="container">
            <NavbarBrand href="/">
                <Logo/>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link href='/'>
                            <a className="nav-link">Home</a>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href='/games'>
                            <a className="nav-link">Games</a>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href='/admin'>
                            <a className="nav-link">Admin</a>
                        </Link>
                    </NavItem>
                </Nav>
                <UserMenu/>
            </Collapse>
        </div>
       
    </Navbar>
  );
}

export default Navigation;