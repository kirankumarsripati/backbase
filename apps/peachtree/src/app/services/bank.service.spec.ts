import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BankService } from './bank.service';

describe('BankService', () => {
  let service: BankService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(BankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
