import { Box, Flex, Heading, Text, Image, Icon } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <Flex
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      color="gray.700"
    >
      <Box maxW="500px" textAlign="center">
        <Icon as={FaExclamationTriangle} fontSize="4xl" color="red.500" mb={4} />
        <Heading fontSize="4xl" fontWeight="bold">
          404: Page Not Found
        </Heading>
        <Text mt={4} fontSize="lg">
          The page you are looking for does not exist.
        </Text>
        <Text mt={4}>
          Please check the URL or try again later.
        </Text>
        <Box mt={8}>
          <Image src="https://geek.design/wp-content/uploads/2019/01/BlogGraphic_4_404.png" alt="404 Error" />
        </Box>
      </Box>
    </Flex>
  );
};

export default NotFoundPage;