import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { ExamplesComponent } from './examples/examples.component';
import { SvgComponent } from './svg/svg.component';
import { PrinciplesComponent } from './principles/principles.component';
import { SelectionsComponent } from './selections/selections.component';
import { BindingDataComponent } from './binding-data/binding-data.component';

export const appRoutes:Routes = [
    {path: '', component: HomeComponent},
    {path: 'examples', component: ExamplesComponent},
    {path: 'intro', component: IntroComponent},
    {path: 'svg', component: SvgComponent},
    {path: 'drawing-shapes', component: ExamplesComponent},
    {path:'principles', component: PrinciplesComponent},
    {path: 'selections', component: SelectionsComponent},
    {path: 'binding-data', component: BindingDataComponent}
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
    IntroComponent,
    HomeComponent,
    ExamplesComponent,
    SvgComponent,
    PrinciplesComponent,
    SelectionsComponent,
    BindingDataComponent
]