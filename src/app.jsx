import React from 'react';
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <div className='text-6xl text-indigo-300 flex-center'>
        App
    </div>
  )
}

export default App