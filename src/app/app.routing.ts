import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { ExamplesComponent } from './examples/examples.component';
import { SvgComponent } from './svg/svg.component';
import { PrinciplesComponent } from './principles/principles.component';
import { SelectionsComponent } from './selections/selections.component';
import { BindingDataComponent } from './binding-data/binding-data.component';
import { LoadExtDataComponent } from './load-ext-data/load-ext-data.component';
import { AnimationsComponent } from './animations/animations.component';
import { InteractivityComponent } from './interactivity/interactivity.component';
import { ScalesComponent } from './scales/scales.component';
import { AxesComponent } from './axes/axes.component';
import { ChartsIntroComponent } from './charts-intro/charts-intro.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { D3LayoutsComponent } from './d3-layouts/d3-layouts.component';
import { PanZoomComponent } from './pan-zoom/pan-zoom.component';
import { GeojsonComponent } from './geojson/geojson.component'; 

export const appRoutes:Routes = [
    {path: '', component: IntroComponent},
    {path: 'examples', component: ExamplesComponent},
    {path: 'intro', component: IntroComponent},
    {path: 'svg', component: SvgComponent},
    {path: 'drawing-shapes', component: ExamplesComponent},
    {path: 'principles', component: PrinciplesComponent},
    {path: 'selections', component: SelectionsComponent},
    {path: 'binding-data', component: BindingDataComponent},
    {path: 'load-ext-data', component: LoadExtDataComponent},
    {path: 'animations', component: AnimationsComponent},
    {path: 'interactivity', component: InteractivityComponent},
    {path: 'scales', component: ScalesComponent},
    {path: 'axes', component: AxesComponent},
    {path: 'intro-to-charts', component: ChartsIntroComponent},
    {path: 'bar-chart', component: BarChartComponent},
    {path: 'line-chart', component: LineChartComponent},
    {path: 'pie-chart', component: PieChartComponent},
    {path: 'layouts', component: D3LayoutsComponent},
    {path: 'panning-dragging', component: PanZoomComponent},
    {path: 'geojson', component: GeojsonComponent}    
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
    BindingDataComponent,
    LoadExtDataComponent,
    AnimationsComponent,
    InteractivityComponent,
    ScalesComponent,
    AxesComponent,
    ChartsIntroComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    D3LayoutsComponent,
    PanZoomComponent,
    GeojsonComponent
]