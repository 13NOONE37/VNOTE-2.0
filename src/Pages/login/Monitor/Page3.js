import React, { useEffect, useRef } from 'react';
import { ReactComponent as Page } from 'assets/Icons/Page3.svg';
import gsap from 'gsap';

export default function Page3() {
  const svgRef = useRef(null);

  // useEffect(() => {
  //   const [elements] = svgRef.current.children;

  //   const character = elements.querySelector('#character');
  //   const locker = elements.querySelector('#locker');
  //   const cards = elements.querySelector('#cards').children;
  //   const cardsContent = [
  //     ...[...cards].map((item) => item.children)[0],
  //     ...[...cards].map((item) => item.children)[1],
  //   ];

  //   gsap.set([character, locker, ...cards, ...cardsContent], {
  //     autoAlpha: 0,
  //   });
  //   gsap.set(locker, { transformOrigin: 'center' });
  //   const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
  //   tl.fromTo(
  //     character,
  //     { x: '30', delay: 0.5 },
  //     { x: '-10', autoAlpha: 1 },
  //   ).fromTo(
  //     cards,
  //     { rotate: 180 },
  //     { rotate: 0, autoAlpha: 1, stagger: 0.8 },
  //     '-2',
  //   );
  //   tl.fromTo(
  //     cardsContent,
  //     { scaleX: 0 },
  //     { scaleX: 1, autoAlpha: 1, stagger: 0.1 },
  //   );
  //   tl.fromTo(locker, { rotate: 60 }, { rotate: 0, scale: 1, autoAlpha: 1 })
  //     .to(locker, { scale: 1.2 })
  //     .to(locker, { scale: 1 });
  // });
  //todo zamienic kolor na zolty jesli bedzie bardziej pasowac
  return (
    <g ref={svgRef}>
      <Page />
    </g>
  );
}
