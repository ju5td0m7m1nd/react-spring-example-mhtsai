import { Button, Heading } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import BeforeAfter from '../containers/BeforeAfter';


function Before() {
  const [status, setStatus] = useState<'stall' | 'bootstrapping' | 'done'>('stall');

  return (
    <>
      <Heading>{status}</Heading>
      {status === 'stall' && <Button onClick={
        () => {
          setStatus('bootstrapping')
          setTimeout(() => setStatus('done'), 1500);
        }
      }>
        Load
      </Button>
      }
    </>
  )
}

function After() {
  const [status, setStatus] = useState<'stall' | 'bootstrapping' | 'done'>('stall');
  const [style, springApi] = useSpring(() => ({
    number: 0,
    onRest: () => setStatus('done')
  }))

  return (
    <>  
      {
        status === 'bootstrapping' && <Heading > <animated.div>
        {style.number.to(n => n.toFixed(0))}
      </animated.div></Heading>
      }
      <Heading>{status}</Heading>
      {status === 'stall' && <Button onClick={
        () => {
          setStatus('bootstrapping')
          springApi.start({
            to: { number: 100 }
          })
        }
      }>
        Load
      </Button>
      }
   </>
  )
}

function Section02() {
  
  return (
    <BeforeAfter  
      before={<Before />}
      after={<After />}
      title="Loading State"
    />
  )
}

export default Section02