import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

import { ReviewTransferComponent } from './review-transfer.component';

describe('ReviewTransferComponent', () => {
  let component: ReviewTransferComponent;
  let fixture: ComponentFixture<ReviewTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTransferComponent ],
      imports: [ModalModule.forRoot()],
      providers: [BsModalRef],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTransferComponent);
    component = fixture.componentInstance;
    component.transferData = {
      toAccount: 'Backbase',
      amount: 1000,
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
