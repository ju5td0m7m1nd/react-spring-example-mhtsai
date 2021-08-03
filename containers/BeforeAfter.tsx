import { Container, Flex, Heading } from "@chakra-ui/layout";
import { Badge, Box } from "@chakra-ui/react";
import React from "react";

function BeforeAfter({ before, after, title }: any) {
  return (
    <Box maxWidth="1280px" mx="auto" h="100vh" p={8} bg="bisque">
      <Heading fontSize="4xl" textAlign="center">
        {title}
      </Heading>
      <Flex h="lg" mt={16}>
        <Flex
          width="49%"
          mx="auto"
          shadow="md"
          bg="whiteAlpha.700"
          p={4}
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          pos="relative"
        >
          <Badge
            pos="absolute"
            top={0}
            left={0}
            fontSize="md"
            colorScheme="purple"
            zIndex={2}
          >
            Without react-spring
          </Badge>
          {before}
        </Flex>
        <Flex
          width="49%"
          mx="auto"
          shadow="md"
          bg="whiteAlpha.700"
          p={4}
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          pos="relative"
        >
          <Badge
            pos="absolute"
            top={0}
            left={0}
            fontSize="md"
            colorScheme="purple"
            zIndex={2}
          >
            With react-spring
          </Badge>
          {after}
        </Flex>
      </Flex>
    </Box>
  );
}

export default BeforeAfter;
