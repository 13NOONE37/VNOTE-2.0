import React, { useEffect, useRef } from 'react';
import { ReactComponent as Page } from 'assets/Icons/Page4.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default function Page4() {
  const svgRef = useRef(null);
  useEffect(() => {
    const [elements] = svgRef.current.children;

    const btc = elements.querySelector('#Btc');
    const branch1 = elements.querySelector('#Branch1').children;
    const branch1dots = elements.querySelector('#Branch1Dots').children;
    const branch2 = elements.querySelector('#Branch2').children;
    const branch2dots = elements.querySelector('#Branch2Dots').children;
    const branch3 = elements.querySelector('#Branch3').children;
    const branch3dots = elements.querySelector('#Branch3Dots').children;
    const branch4 = elements.querySelector('#Branch4').children;
    const branch4dots = elements.querySelector('#Branch4Dots').children;
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(
      [
        btc,
        [...branch1],
        [...branch1dots],
        [...branch2],
        [...branch2dots],
        [...branch3],
        [...branch3dots],
        [...branch4],
        [...branch4dots],
      ],
      {
        autoAlpha: 0,
        ease: 'power3.inOut',
      },
    );
    gsap.set(btc, { transformOrigin: 'center' });
    ScrollTrigger.create({
      trigger: svgRef.current,
      once: true,
      markers: false,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
        tl.fromTo(btc, { scale: 0 }, { scale: 1, autoAlpha: 1 })
          .fromTo(
            branch1,
            { scale: 0 },
            { scale: 1, autoAlpha: 1, stagger: 0.05 },
          )
          .fromTo(
            branch1dots,
            { scale: 0 },
            { scale: 1, autoAlpha: 1, stagger: 0 },
          )
          .fromTo(
            branch2,
            { scale: 0 },
            { scale: 1, autoAlpha: 1, stagger: 0.05 },
          )
          .fromTo(
            branch2dots,
            { scale: 0 },
            { scale: 1, autoAlpha: 1, stagger: 0 },
          )
          .fromTo(
            branch3,
            { scale: 0 },
            { scale: 1, autoAlpha: 1, stagger: 0.05 },
          )
          .fromTo(
            branch3dots,
            { scale: 0 },
            { scale: 1, autoAlpha: 1, stagger: 0 },
          )
          .fromTo(
            branch4,
            { scale: 0 },
            { scale: 1, autoAlpha: 1, stagger: 0.05 },
          )
          .fromTo(
            branch4dots,
            { scale: 0 },
            { scale: 1, autoAlpha: 1, stagger: 0 },
          );
      },
    });
  });
  return (
    <g ref={svgRef}>
      <Page />
    </g>
  );
}
