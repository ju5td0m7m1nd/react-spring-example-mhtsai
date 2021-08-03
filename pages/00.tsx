import { Container } from '@chakra-ui/layout';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { animated, useChain, useSpring, useSpringRef, useTransition } from 'react-spring';
import BeforeAfter from '../containers/BeforeAfter';


function Before() {
  const [status, setStatus] = useState<'stall' | 'bootstrapping' | 'done'>('stall');
  const [page, setPage] = useState<'app' | 'thankyou'>()

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

  useEffect(() => {
    if (tasks.length === 0) {
      setPage('thankyou')
    }
  }, [tasks.length]);

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column" w="full" h="full">
      {
        page === undefined && <>
          <Heading>Welcome to Todo App</Heading>
          {status === 'stall' && <Button onClick={
            () => {
              setStatus('bootstrapping')
              setTimeout(() => {
                setStatus('done')
                setPage('app')
              }, 1500);
            }
          }>
            Load
          </Button>
          }
        </>
      }
      {
        status === 'done' && page === 'app' &&  <Flex flexDir="column" p={2} bg='gray' alignItems="center" justifyContent="center" w="full" height="full" position="relative">
        {
          tasks.map(task => <Flex w="full" key={task.id} shadow="md" p={4} bg="white" mb={2} alignItems="center">
            <Heading fontSize="lg">{task.name}</Heading>
            <Button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} ml="auto" colorScheme="pink">Resolve</Button>
          </Flex>)
        }
      </Flex>
      }
      {
        status === 'done' && page === 'thankyou' && <Heading color="#222">All tasks done 🍻</Heading>
      }
    </Flex>
  )
}

function After() {
  const [status, setStatus] = useState<'stall' | 'bootstrapping' | 'done'>('stall');
  const [page, setPage] = useState<'app' | 'thankyou'>()

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

  const [loadingNum, loadingNumApi] = useSpring(() => ({
    from: {
      number: 0,
    },
    onRest: () => {
      setStatus('done');
      setPage('app');
    }
  }))

  const transition = useTransition(tasks, {
    trail: 1000 / tasks.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  })

  const boxShrinkRef = useSpringRef();

  const boxShrinkStyle = useSpring({
    ref: boxShrinkRef,
    from: {
      size: '100%',
    },
    to: {
      size: '0%',
    },
    onRest: () =>  setPage('thankyou')
  })

  const textRef = useSpringRef();

  const textStyle = useSpring({
    ref: textRef,
    from: {
      marginTop: '100px',
      opacity: 0,
    },
    to: {
      marginTop: '0px',
      opacity: 1,
    },
  })


  useChain(tasks.length > 0 ? []: [boxShrinkRef, textRef], [0, 1])

 

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column" w="full" h="full" position="relative">
      {
        page === undefined && <>
          <Heading>Welcome to Todo App</Heading>
          {
            status !== 'stall' && 
              <Heading fontSize="lg">
                <animated.span>{loadingNum.number.to(n => n.toFixed(0))}</animated.span>%
              </Heading>
           
          }
          {status === 'stall' && <Button onClick={
            () => {
              setStatus('bootstrapping')
              loadingNumApi.start({ to: {number: 100 }})
            }
          }>
            Load
          </Button>
          }
        </>
      }
      {
        status === 'done' &&  <Flex w="full" h="full" alignItems="center" justifyContent="center">
        {
       page === 'app' &&  
          <animated.div style={{ width: boxShrinkStyle.size, height: boxShrinkStyle.size, overflow: 'hidden', position: 'absolute'}}>
            <Flex pos="absolute" flexDir="column" p={2} bg='gray' alignItems="center" justifyContent="center" w="full" height="full" position="relative">
          {
            transition((style, task) => <animated.div style={{...style, width: '100%'}}>
              <Flex w="full" key={task.id} shadow="md" p={4} bg="white" mb={2} alignItems="center">
              <Heading fontSize="lg">{task.name}</Heading>
              <Button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} ml="auto" colorScheme="pink">Resolve</Button>
            </Flex>
            </animated.div>)
          }
        </Flex>
          </animated.div>
          
        }
         {
        status === 'done' && page === 'thankyou' && <animated.div style={textStyle}><Heading color="#222">All tasks done 🍻</Heading></animated.div> 
      }
        </Flex>
      }
    </Flex>
  )
}


function Section0() {
  return (
    <BeforeAfter  
      before={<Before />}
      after={<After />}
      title="Something called todo app"
    />
  )
}

export default Section0;