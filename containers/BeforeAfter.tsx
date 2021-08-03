import { Container, Flex, Heading } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import React from 'react';

function BeforeAfter({before, after, title}: any) {
  return (
    <Box maxWidth="1280px" mx="auto" h="100vh" p={8} bg="bisque">
      <Heading fontSize="2xl" textAlign="center">{title}</Heading>
      <Flex h="lg" mt={8}>
        <Flex width="49%" mx="auto" shadow="md" bg="whiteAlpha.700" p={4} alignItems="center" justifyContent="center" flexDir="column">
          {before}
        </Flex>
        <Flex width="49%" mx="auto" shadow="md" bg="whiteAlpha.700" p={4} alignItems="center" justifyContent="center" flexDir="column">
          {after}
        </Flex>
      </Flex>
    </Box>
  )
}

export default BeforeAfter;