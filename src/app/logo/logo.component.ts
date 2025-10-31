import { Component } from '@angular/core';
import gsap from 'gsap';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';

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
    gsap.registerPlugin(MorphSVGPlugin);
  }

  trigger() {
    gsap.to(this.morphFrom, { duration: 1, morphSVG: this.morphTo, type: 'rotational' });
  }
}
