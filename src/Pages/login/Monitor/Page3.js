import React, { useEffect, useRef } from 'react';
import { ReactComponent as Page } from 'assets/Icons/Page3.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default function Page3() {
  const svgRef = useRef(null);

  useEffect(() => {
    const [elements] = svgRef.current.children;

    const character = elements.querySelector('#Character');
    const phoneContent = elements.querySelector('#Phone').children;
    const tabletContent = elements.querySelector('#Tablet').children;
    const laptopContent = elements.querySelector('#Laptop').children;
    gsap.registerPlugin(ScrollTrigger);

    gsap.set([character, ...phoneContent, ...tabletContent, ...laptopContent], {
      autoAlpha: 0,
      ease: 'power3.inOut',
    });

    ScrollTrigger.create({
      trigger: svgRef.current,
      once: true,
      markers: false,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
        tl.fromTo(
          character,
          { x: '-30', delay: 0.5 },
          {
            x: '10',
            autoAlpha: 1,
            scrollTrigger: {
              trigger: character,
              start: 'top 80%',
              markers: false,
              scrub: false,
            },
          },
        );
        [phoneContent, tabletContent, laptopContent].forEach((element) => {
          tl.fromTo(
            element,
            { scale: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              stagger: 0.1,
            },
          );
        });
      },
    });
  });

  return (
    <g ref={svgRef}>
      <Page />
    </g>
  );
}
