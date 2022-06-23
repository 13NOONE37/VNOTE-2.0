import React, { useEffect, useRef } from 'react';
import { ReactComponent as Page } from 'assets/Icons/Page2.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
export default function Page2() {
  const svgRef = useRef(null);

  useEffect(() => {
    const [elements] = svgRef.current.children;

    const character = elements.querySelector('#character');
    const locker = elements.querySelector('#locker');
    const cards = elements.querySelector('#cards').children;
    const cardsContent = [
      ...[...cards].map((item) => item.children)[0],
      ...[...cards].map((item) => item.children)[1],
    ];
    gsap.registerPlugin(ScrollTrigger);
    gsap.set([character, locker, ...cards, ...cardsContent], {
      autoAlpha: 0,
    });
    gsap.set(locker, { transformOrigin: 'center', ease: 'power3.inOut' });
    ScrollTrigger.create({
      trigger: svgRef.current,
      once: true,
      markers: false,

      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
        tl.fromTo(
          character,
          { x: '30', delay: 0.5 },
          {
            x: '-10',
            autoAlpha: 1,
          },
        )
          .fromTo(
            cards,
            { rotate: 180 },
            {
              rotate: 0,
              autoAlpha: 1,
              stagger: 0.8,
            },
            '-2',
          )
          .fromTo(
            cardsContent,
            { scaleX: 0 },
            {
              scaleX: 1,
              autoAlpha: 1,
              stagger: 0.1,
            },
          )
          .fromTo(
            locker,
            { rotate: 60 },
            {
              rotate: 0,
              scale: 1,
              autoAlpha: 1,
            },
          )
          .to(locker, { scale: 1.2 })
          .to(locker, { scale: 1 });
      },
    });
  });
  return (
    <g ref={svgRef}>
      <Page />
    </g>
  );
}
