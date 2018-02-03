import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from './intro/intro.component';

export const appRoutes:Routes = [
    {path: 'intro', component: IntroComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(
        appRoutes,
        { 
            useHash: true,
            // enableTracing: true  // <-- debugging purposes only
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}

export const RoutableComponents = [
    IntroComponent
]