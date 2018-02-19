import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3LayoutsComponent } from './d3-layouts.component';

describe('D3LayoutsComponent', () => {
  let component: D3LayoutsComponent;
  let fixture: ComponentFixture<D3LayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3LayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3LayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
