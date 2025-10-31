import { Routes } from '@angular/router';
import { BasicAnimations } from './basic-animations/basic-animations.component';
import { Fireworks } from './fireworks/fireworks';
import { MoveIt } from './move-it/move-it';
import { Flower } from './flower/flower';

export const routes: Routes = [
  { path: 'fireworks', component: Fireworks },
  { path: 'move-it', component: MoveIt },
  { path: 'flower', component: Flower },
  { path: '', component: BasicAnimations },
];
