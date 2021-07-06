import { Component, Input } from '@angular/core';
import { Transaction } from '../../api-interfaces';

@Component({
  selector: 'bb-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  filter = '';
}
