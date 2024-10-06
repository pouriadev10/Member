/* eslint-disable */
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

import {
  AiOutlineUp,
  AiOutlineDown
} from 'react-icons/ai'

import { Row, Col } from "antd";

export function SidebarLinks(props) {
  //   Chakra color mode

  const [openSetting, setOpenSetting] = useState(false)


  const handleToggleSetting = () => {
    setOpenSetting(!openSetting)
  }



  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };


  useEffect(() => {
    const isAddConnectedAccountRoute = window.location.href.includes("connected");

    if (isAddConnectedAccountRoute) {
      setOpenSetting(true);
    }

  }, [window.location.href]);



  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <>
            <Text
              fontSize={"md"}
              color={activeColor}
              fontWeight='bold'
              mx='auto'
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt='18px'
              pb='12px'
              key={index}>
              {route.name}
            </Text>
            {createLinks(route.items)}
          </>
        );
      } else if (
        route.layout === "/create" ||
        route.layout === "/payment" ||
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return (
          route.hide ?
            <></>
            :
            route.children ?

              <div className="menuItemHaveSubMenu" onClick={handleToggleSetting}>
                <HStack

                  spacing={

                    "22px"
                  }
                  py='5px'
                  ps='10px'>
                  <Flex w='100%' alignItems="flex-start" justifyContent='center'>
                    <Box
                      color={
                        textColor
                      }
                      me='18px'>
                      {route.icon}
                    </Box>

                    <Text
                      me='auto'
                      color={
                        textColor
                      }
                      fontWeight={
                        "normal"
                      }>
                      {route.name}
                    </Text>

                    {
                      openSetting ?
                        <AiOutlineDown size={14} color={
                          "var(--chakra-colors-secondaryGray-500)"
                        } />
                        :
                        <AiOutlineUp size={14} color={
                          "var(--chakra-colors-secondaryGray-500)"
                        } />

                    }


                  </Flex>
                  <Box
                    h='36px'
                    w='4px'
                    bg={
                      "transparent"
                    }
                    borderRadius='5px'
                  />
                </HStack>
                {
                  openSetting ?
                    <div className="subMenu">
                      {route.children.map((child) => (
                        <NavLink key={index} to={child.layout + child.path}>
                          <HStack

                            spacing={
                              activeRoute(child.path.toLowerCase()) ? "22px" : "26px"
                            }
                            py='5px'
                            ps='10px'>
                            <Flex w='100%' alignItems="flex-start" justifyContent='center'>
                              <Box
                                color={
                                  activeRoute(child.path.toLowerCase())
                                    ? activeIcon
                                    : textColor
                                }
                                me='18px'>
                                {child.icon}
                              </Box>

                              <Text
                                me='auto'
                                color={
                                  activeRoute(child.path.toLowerCase())
                                    ? activeColor
                                    : textColor
                                }
                                fontWeight={
                                  activeRoute(child.path.toLowerCase())
                                    ? "bold"
                                    : "normal"
                                }>
                                {child.name}
                              </Text>

                            </Flex>

                          </HStack>

                        </NavLink>
                      ))}
                    </div>
                    :

                    <></>
                }
              </div>
              :
              <NavLink key={index} to={route.layout + route.path}>
                {route.icon ? (
                  <Box>

                    <HStack
                      spacing={
                        activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                      }
                      py='5px'
                      ps='10px'>
                      <Flex w='100%' alignItems="flex-start" justifyContent='center'>
                        <Box
                          color={
                            activeRoute(route.path.toLowerCase())
                              ? activeIcon
                              : textColor
                          }
                          me='18px'>
                          {route.icon}
                        </Box>
                        <Text
                          me='auto'
                          color={
                            activeRoute(route.path.toLowerCase())
                              ? activeColor
                              : textColor
                          }
                          fontWeight={
                            activeRoute(route.path.toLowerCase())
                              ? "bold"
                              : "normal"
                          }>
                          {route.name}
                        </Text>
                      </Flex>
                      <Box
                        h='36px'
                        w='4px'
                        bg={
                          activeRoute(route.path.toLowerCase())
                            ? brandColor
                            : "transparent"
                        }
                        borderRadius='5px'
                      />
                    </HStack>


                  </Box>
                ) : (
                  <Box>
                    <HStack
                      spacing={
                        activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                      }
                      py='5px'
                      ps='10px'>
                      <Text
                        me='auto'
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : inactiveColor
                        }
                        fontWeight={
                          activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                        }>
                        {route.name}
                      </Text>
                      <Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
                    </HStack>
                  </Box>
                )}
              </NavLink>
        );
      }
    });
  };
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
