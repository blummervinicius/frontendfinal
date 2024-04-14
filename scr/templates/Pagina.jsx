import { Container } from "react-bootstrap";

import Menu from "./Menu";
import React from "react";

export default function Pagina(props){
  return(
    <>
   
    <Menu/>
    <Container>
    {props.children}
    </Container>
    <br/>
    <br/>
  
    </>

  )
}