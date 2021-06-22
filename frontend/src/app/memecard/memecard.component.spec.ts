import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemecardComponent } from './memecard.component';

describe('MemecardComponent', () => {
  let component: MemecardComponent;
  let fixture: ComponentFixture<MemecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
