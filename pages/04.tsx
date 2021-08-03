import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import {
  animated,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "react-spring";
import BeforeAfter from "../containers/BeforeAfter";

function Before() {
  const [page, setPage] = useState<"app" | "thankyou">("app");

  return (
    <Flex
      bg="gray"
      alignItems="center"
      justifyContent="center"
      w="full"
      height="full"
    >
      {page === "app" && (
        <Flex w="full" h="full" bg="black">
          <Button onClick={() => setPage("thankyou")} m="auto">
            Finish App
          </Button>
        </Flex>
      )}
      {page === "thankyou" && <Heading color="#fff">Thank you</Heading>}
    </Flex>
  );
}

function After() {
  const [page, setPage] = useState<"app" | "thankyou">("app");

  const boxShrinkRef = useSpringRef();

  const style = useSpring({
    ref: boxShrinkRef,
    from: {
      size: "100%",
    },
    to: {
      size: "0%",
    },
  });

  const textRef = useSpringRef();

  const textStyle = useSpring({
    ref: textRef,
    from: {
      marginTop: "100px",
      opacity: 0,
    },
    to: {
      marginTop: "0px",
      opacity: 1,
    },
  });

  useChain(page === "app" ? [] : [boxShrinkRef, textRef], [0, 1]);

  return (
    <Flex
      bg="gray"
      alignItems="center"
      justifyContent="center"
      w="full"
      height="full"
      position="relative"
    >
      <animated.div
        style={{
          width: style.size,
          height: style.size,
          overflow: "hidden",
          position: "absolute",
        }}
      >
        <Flex w="full" h="full" bg="black">
          <Button onClick={() => setPage("thankyou")} m="auto">
            Finish App
          </Button>
        </Flex>
      </animated.div>
      <animated.div style={textStyle}>
        <Heading color="#fff">Thank you</Heading>
      </animated.div>
    </Flex>
  );
}

function Section04() {
  return <BeforeAfter before={<Before />} after={<After />} title="Chain" />;
}

export default Section04;
