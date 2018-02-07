import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadExtDataComponent } from './load-ext-data.component';

describe('LoadExtDataComponent', () => {
  let component: LoadExtDataComponent;
  let fixture: ComponentFixture<LoadExtDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadExtDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadExtDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
