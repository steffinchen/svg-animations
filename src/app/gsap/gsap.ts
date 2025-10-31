import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MotionPathHelper } from 'gsap/MotionPathHelper';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

@Component({
  selector: 'app-gsap',
  imports: [],
  templateUrl: './gsap.html',
  styleUrl: './gsap.css',
})
export class Gsap implements AfterViewInit {
  @ViewChild('triangle') triangle!: ElementRef<SVGPolygonElement>;
  @ViewChild('path') path!: ElementRef<SVGPathElement>;
  constructor() {
    gsap.registerPlugin(Draggable, InertiaPlugin, MotionPathPlugin, MotionPathHelper);
  }

  ngAfterViewInit(): void {
    Draggable.create('#box', {
      inertia: true,
      edgeResistance: 0.75,
      bounds: '#canvas',
    });
  }

  editPath(): void {
    this.triggerAnimation();
    MotionPathHelper.create(this.triangle.nativeElement);
  }

  triggerAnimation(): void {
    gsap.to('.triangle', {
      motionPath: { path: '#path', autoRotate: true },
      duration: 2,
      ease: 'power1.inOut',
      autoRotate: 90,
    });
  }
}
