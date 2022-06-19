import React, { useEffect, useRef } from 'react';
import { ReactComponent as Page } from 'assets/Icons/Page1.svg';
import gsap from 'gsap';
export default function Page1() {
  const svgRef = useRef(null);

  useEffect(() => {
    const [elements] = svgRef.current.children;
    console.log(elements);
    const drawCharacter = elements.querySelector('#drawCharacter');
    const drawWindow = elements.querySelector('#drawWindow');
    const drawNotes = elements.querySelector('#drawNotes');
    const pie = elements.querySelector('#Pie');
    gsap.set([drawCharacter, drawWindow, drawNotes, pie], { autoAlpha: 0 });
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    tl.fromTo(drawCharacter, { x: '-=10' }, { x: '+=10', autoAlpha: 1 });
  });
  //todo zamienic kolor na zolty jesli bedzie bardziej pasowac
  return (
    <g ref={svgRef}>
      <Page />
    </g>
  );
}
