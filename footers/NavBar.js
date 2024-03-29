import React from "react";
import styled from "styled-components";

import { minHeight, minWidth, onHover } from "../styles/clickable";

import addPx from "../functions/addPx";

const Nav = styled.nav`
    border-top: 1px solid black;
    height: ${addPx(minHeight, 10)};
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Link = styled.div`
    height: ${minHeight};
    width: ${minWidth};
    line-height: ${minHeight};
    &:hover {
        ${onHover}
    }
`;

/**
 * The nav bar is designed for the use of phone apps specifically at the bottom of the sreen.
 * It takes the children passed into the component and displays them in the nav bar style.
 * All items in the nav are displaced evenly regardless of how many elements there are in it.
 * @param {string} id - The id of the nav bar.
 * @param {string} className - The class name of the nav bar.
 * @param {Object} children - an array of react elements to be displayed in the nav bar.
 * @returns {ReactElement} - The nav bar.
 */
export default function NavBar({
    id,
    className,
    children,
}) {
    return (
        <Nav id={id} className={"oui-nav-footer " + className}>
            {((children && children.length) ? children.map(child => {
                return child;
            }) : (()=>{
                console.warn("oui: NavBar should have more then one child");
                return (children) ? [children] : [];
            })()).map((child, index) => {
                return <Link key={index}>{child}</Link>;
            })}
        </Nav>
    );
}