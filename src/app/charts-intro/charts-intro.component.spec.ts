import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsIntroComponent } from './charts-intro.component';

describe('ChartsIntroComponent', () => {
  let component: ChartsIntroComponent;
  let fixture: ComponentFixture<ChartsIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
