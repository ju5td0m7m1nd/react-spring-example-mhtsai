import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import {
  config,
  useChain,
  useSpring,
  useSpringRef,
  useTrail,
  useTransition,
} from "@react-spring/core";
import { animated } from "@react-spring/web";
import React, { useCallback, useState } from "react";

const X_OFFSET = 900;
const Y_OFFSET = 300;

function Section01() {
  return (
    <Box
      maxWidth="1280px"
      mx="auto"
      h="100vh"
      overflowY="auto"
      p={8}
      bg="bisque"
    >
      <Heading mb={16}>Introduction</Heading>
      <StateAccessibility />
      <PhysicalAnimation />
      <HandsOn01 />
      <HandsOn02 />
      <HandsOn03 />
      <HandsOn04 />
    </Box>
  );
}

function StateAccessibility() {
  const [xStart, setStart] = useState(false);
  const [yStart, setYStart] = useState(false);

  const [xStyle, xApi] = useSpring(() => ({
    from: {
      marginLeft: 0,
    },
    config: {
      ...config.wobbly,
      duration: 4000,
    },
  }));

  const [yStyle, yApi] = useSpring(() => ({
    from: {
      marginTop: 0,
    },
    config: {
      ...config.wobbly,
      duration: 4000,
    },
  }));

  return (
    <Block title="CSS transition vs Animation API - State Access">
      <HStack my={4}>
        <Button
          onClick={() => {
            setStart(false);
            xApi.start({
              to: {
                marginLeft: 0,
              },
            });
          }}
        >
          Move Left
        </Button>
        <Button
          onClick={() => {
            setStart(true);
            xApi.start({
              to: {
                marginLeft: X_OFFSET,
              },
            });
          }}
        >
          Move Right
        </Button>
        <Button
          onClick={() => {
            xApi.stop();
            yApi.stop();
          }}
        >
          Halt
        </Button>
        <Button
          onClick={() => {
            setYStart(false);
            yApi.start({
              to: {
                marginTop: 0,
              },
            });
          }}
        >
          Move Up
        </Button>
        <Button
          onClick={() => {
            setYStart(true);
            yApi.start({
              to: {
                marginTop: Y_OFFSET,
              },
            });
          }}
        >
          Move Down
        </Button>
      </HStack>
      <Heading fontSize="md" color="#444">
        CSS
      </Heading>
      <Box
        bg="blue"
        width={8}
        height={8}
        ml={xStart ? X_OFFSET : 0}
        mt={yStart ? Y_OFFSET : 0}
        transition="all 4s linear"
      ></Box>
      <Heading fontSize="md" color="#444" mt={8}>
        react-spring
      </Heading>
      <animated.div style={{ ...xStyle, ...yStyle }}>
        <Box bg="blue" width={8} height={8}></Box>
      </animated.div>
    </Block>
  );
}

function PhysicalAnimation() {
  const [xStart, setStart] = useState(false);

  const [xStyle, xApi] = useSpring(() => ({
    from: {
      marginLeft: 0,
    },
    config: {
      ...config.wobbly,
    },
  }));

  return (
    <Block title="CSS transition vs Animation API - Animation formula">
      <HStack my={4}>
        <Button
          onClick={() => {
            setStart(false);
            xApi.start({
              to: {
                marginLeft: 0,
              },
            });
          }}
        >
          Move Left
        </Button>
        <Button
          onClick={() => {
            setStart(true);
            xApi.start({
              to: {
                marginLeft: X_OFFSET,
              },
            });
          }}
        >
          Move Right
        </Button>
      </HStack>
      <Heading fontSize="md" color="#444">
        CSS
      </Heading>
      <Box
        bg="blue"
        width={8}
        height={8}
        ml={xStart ? X_OFFSET : 0}
        transition="all .3s linear"
      ></Box>
      <Heading fontSize="md" color="#444" mt={8}>
        react-spring
      </Heading>
      <animated.div style={{ ...xStyle }}>
        <Box bg="blue" width={8} height={8}></Box>
      </animated.div>
    </Block>
  );
}

function HandsOn01() {
  const [{ number }, numberApi] = useSpring(() => ({
    from: {
      number: 0,
    },
    config: {
      ...config.wobbly,
    },
  }));

  return (
    <Block title="Hands On - useSpring">
      <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
      <HStack mt={2}>
        <Button onClick={() => numberApi.start({ to: { number: 100 } })}>
          Start
        </Button>
        <Button onClick={() => numberApi.start({ to: { number: 0 } })}>
          Reset
        </Button>
      </HStack>
    </Block>
  );
}

function HandsOn02() {
  const [trail, api] = useTrail(10, () => ({ number: 1 }));

  return (
    <Block title="Hands On - useTrail">
      {trail.map(({ number }, idx) => (
        <animated.div key={idx}>{number.to((n) => n.toFixed(0))}</animated.div>
      ))}

      <HStack mt={2}>
        <Button onClick={() => api.start({ to: { number: 100 } })}>
          Start
        </Button>
        <Button onClick={() => api.start({ to: { number: 0 } })}>Reset</Button>
      </HStack>
    </Block>
  );
}

function HandsOn03() {
  const [items, setItems] = useState<string[]>([]);

  const transitions = useTransition(items, {
    from: { number: 50 },
    enter: { number: 100 },
    leave: { number: 0 },
  });

  return (
    <Block title="Hands On - useTransition">
      {transitions(({ number }, item) => (
        <Box my={2}>
          {item}:<animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
        </Box>
      ))}

      <HStack mt={2}>
        <Button
          onClick={() =>
            setItems((items) => items.concat(`Item ${items.length + 1}`))
          }
        >
          Insert
        </Button>
        <Button onClick={() => setItems((items) => items.slice(0, -1))}>
          Pop
        </Button>
      </HStack>
    </Block>
  );
}

function HandsOn04() {
  const [start, setStart] = useState(false);

  const animaRef1 = useSpringRef();
  const animaRef2 = useSpringRef();

  const styleA = useSpring({
    ref: animaRef1,
    from: {
      aNumber: 0,
    },
    to: {
      aNumber: 100,
    },
  });

  const styleB = useSpring({
    ref: animaRef2,
    from: {
      bNumber: 0,
    },
    to: {
      bNumber: 100,
    },
  });

  useChain(start ? [animaRef1, animaRef2] : [], [0, 1]);

  return (
    <Block title="Hands On - useChain">
      <HStack spacing={4}>
        <animated.div>{styleA.aNumber.to((n) => n.toFixed(0))}</animated.div>
        <animated.div>{styleB.bNumber.to((n) => n.toFixed(0))}</animated.div>
      </HStack>

      <HStack mt={2}>
        <Button onClick={() => setStart(true)}>Start</Button>
        <Button
          onClick={() => {
            animaRef1.start({ to: { aNumber: 0 } });
            animaRef2.start({ to: { bNumber: 0 } });
            setStart(false);
          }}
        >
          Reset
        </Button>
      </HStack>
    </Block>
  );
}

function Block({ children, title }: { children: any; title: string }) {
  return (
    <Box w="full" p={8} bg="white" mt={4}>
      <Heading fontSize="lg" color="#222" mb={8}>
        {title}
      </Heading>
      {children}
    </Box>
  );
}

export default Section01;
