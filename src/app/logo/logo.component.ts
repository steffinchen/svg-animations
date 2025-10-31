import { Component } from '@angular/core';
import gsap from 'gsap';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MotionPathHelper } from 'gsap/MotionPathHelper';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class Logo {
  morphFrom = '#t1';
  morphTo = '#bird1';

  constructor() {
    gsap.registerPlugin(MorphSVGPlugin, MotionPathPlugin, MotionPathHelper);
  }

  trigger() {
    gsap.to(this.morphFrom, { duration: 1, morphSVG: this.morphTo, type: 'rotational' });
  }

  fly() {
    const tl = gsap.timeline();
    tl.to('#bird', {
      rotation: 20,
    });
    tl.set('#bird', {
      xPercent: -50,
      yPercent: -50,
    });
    tl.to('#bird', {
      motionPath: {
        alignOrigin: [1, 1],
        path: 'M25.8105,27.3739 C67.0875,28.9319 69.1485,18.2219 91.7585,12.1639 124.9095,3.1419 135.4145,23.0859 198.0095,-64.9121 ',
      },
      duration: 2,
      ease: 'power1.inOut',
    });
    // MotionPathHelper.create('#bird');
  }
}
