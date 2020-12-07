import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimediaDetailsComponent } from './multimedia-details.component';

describe('MultimediaDetailsComponent', () => {
  let component: MultimediaDetailsComponent;
  let fixture: ComponentFixture<MultimediaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultimediaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultimediaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
