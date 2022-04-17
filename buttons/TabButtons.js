import React from "react";
import styled from 'styled-components';

import {onHover, minWidth, minHeight} from '../styles/clickable';
import {secondaryLight, secondary, dark, textLight, textDark, secondaryDark} from "../styles/colors";

import removeProps from "../functions/removeProps";
import { tab } from "@testing-library/user-event/dist/tab";

function generateAutos(length) {
    let auto = "";
    for (let i = 0; i < length; i++) {
        auto = auto.concat(" auto");
    }
    return auto;
}

const Tab = styled.button`
    min-width: ${minWidth};
    height: ${minHeight};
    border: 1px solid ${props=>props.secondaryColor};
    color: ${props=>props.primaryTextColor};    

    background-color: ${props=>props.primaryColor};
    &:hover {
        ${onHover}
    }
`;

const Selected = styled.button`
    min-width: ${minWidth};
    height: ${minHeight};
    border: 1px solid ${props=>props.secondaryColor};
    color: ${props=>props.primaryTextColor};

    position: relative;
    transform: scale(1.1);
    z-index:1;
    background-color: ${props=>props.secondaryColor};
    color: ${props=>props.secondaryTextColor};
`;

const Field = styled.div`
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: ${props=>generateAutos(props.children.length)};
    grid-template-rows: auto;
`;

export default function TabButtons({
    id,
    className,
    primaryColor = secondaryLight,
    secondaryColor = secondaryDark,
    primaryTextColor = textDark,
    secondaryTextColor = textDark,
    children,
}) {
    const[current, setCurrent] = React.useState(0);

    let props = {
        id,
        className,
        primaryColor,
        secondaryColor,
        primaryTextColor,
        secondaryTextColor,
        children,
    }

    return (
        <Field id={id} className={"oui-field " + className} {...props}>
            {children.map((child, index)=>{
                const filteredChild = removeProps(child, ["onClick"]);
                //This is a joke for my brother:
                return (index === current) ? 
                    <Selected 
                        key={index}
                        className="oui-tab-selected"
                        {...props}
                    >
                        {filteredChild}
                    </Selected>
                    :
                    <Tab
                        key={index}
                        className="oui-tab"
                        onClick={()=>{
                            setCurrent(index);
                            child.props.onClick();
                        }}
                        {...props}
                    >
                        {filteredChild}
                    </Tab>; 
            })}
        </Field>
    );
}