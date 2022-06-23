import React, { useEffect, useRef } from 'react';
import { ReactComponent as Page } from 'assets/Icons/Page1.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
export default function Page1() {
  const svgRef = useRef(null);

  useEffect(() => {
    const [elements] = svgRef.current.children;

    const drawCharacter = elements.querySelector('#drawCharacter');
    const drawWindow = elements.querySelector('#drawWindow');
    const drawNotes = elements.querySelector('#drawNotes');
    const pie = elements.querySelector('#Pie');
    gsap.registerPlugin(ScrollTrigger);
    gsap.set([drawCharacter, drawWindow, ...drawNotes.children, pie], {
      autoAlpha: 0,
    });
    gsap.set(pie, { transformOrigin: 'center' });
    gsap.set(drawNotes.children, { transformOrigin: 'center' });

    ScrollTrigger.create({
      trigger: svgRef.current,
      once: true,
      markers: false,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
        tl.fromTo(
          drawCharacter,
          { x: '-30', delay: 0.5 },
          { x: '10', autoAlpha: 1 },
        )
          .fromTo(drawWindow, { scale: 0 }, { scale: 1, autoAlpha: 1 })
          .fromTo(pie, { rotate: 180 }, { rotate: 0, autoAlpha: 1 }, '-=0.2')
          .fromTo(
            drawNotes.children,
            { rotate: 90, scale: 0 },
            {
              rotate: 0,
              scale: 1,
              autoAlpha: 1,
              stagger: 0.3,
            },
          )
          .fromTo(
            drawNotes.children[6],
            { rotate: 0, delay: 0.5 },
            { rotate: 30 },
          )
          .to(drawNotes.children[6], { rotate: 0 });
      },
    });
  });

  return (
    <g ref={svgRef}>
      <Page />
    </g>
  );
}
