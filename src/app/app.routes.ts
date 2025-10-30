import { Routes } from '@angular/router';
import { BasicAnimations } from './basic-animations/basic-animations.component';
import { Fireworks } from './fireworks/fireworks';

export const routes: Routes = [
  { path: 'fireworks', component: Fireworks },
  { path: '', component: BasicAnimations },
];
