import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import MemberpointLogo from "../../../assets/img/logo.png";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <img alt="logo" src={MemberpointLogo}  style={{width:"80%", marginBottom:"15px"}}/>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
