import { Button, Flex, Heading } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import BeforeAfter from '../containers/BeforeAfter';


function Before() {
  const [tasks, setTasks] = useState<{id: number, name: string}[]>([{
    id: 0,
    name: "Drink coffee"
  }, {
    id: 1,
    name: "Pet my cat"
  }, {
    id: 2,
    name: "Assign Sentry issue to myself :("
  }]);

  return (
    <>
      {
        tasks.map(task => <Flex w="full" key={task.id} shadow="md" p={4} bg="white" mb={2} alignItems="center">
          <Heading fontSize="lg">{task.name}</Heading>
          <Button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} ml="auto" colorScheme="pink">Resolve</Button>
        </Flex>)
      }
    </>
  )
}

function After() {
  const [tasks, setTasks] = useState<{id: number, name: string}[]>([{
    id: 0,
    name: "Drink coffee"
  }, {
    id: 1,
    name: "Pet my cat"
  }, {
    id: 2,
    name: "Assign Sentry issue to myself :("
  }]);

  const transition = useTransition(tasks, {
    trail: 1000 / tasks.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  })

  return (
    <>
    {
      transition((style, item) => <animated.div style={{...style, width: '100%'}}>
          <Flex w="full" key={item.id} shadow="md" p={4} bg="white" mb={2} alignItems="center">
          <Heading fontSize="lg">{item.name}</Heading>
          <Button onClick={() => setTasks(tasks.filter(t => t.id !== item.id))} ml="auto" colorScheme="pink">Resolve</Button>
        </Flex>
      </animated.div>)
    }
      
    </>
  )
}

function Section03() {
  
  return (
    <BeforeAfter  
      before={<Before />}
      after={<After />}
      title="Mount / Unmount"
    />
  )
}

export default Section03