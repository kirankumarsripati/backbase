import {
  getAmount,
  getAssignment,
  getConfirmTransferBtn,
  getFilterInput,
  getMakeTransferBtn,
  getToAccount,
  getTransactionAmount,
  getTransactionDate,
  getTransactionMerchantName,
  getTransactionType,
} from '../support/app.po';

describe('peachtree', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display assignment name', () => {
    getAssignment().contains('Frontend Technical Assignment');
  });

  it('should filter transaction list', () => {
    getFilterInput().type('back');
    getTransactionDate().contains('Sep. 19');
    getTransactionMerchantName().contains('Backbase');
    getTransactionType().contains('Salaries');
    getTransactionAmount().contains('€5,000');
  });

  it('should validate make transfer form', () => {
    // check if the account field is required
    const account = getToAccount();
    account.type('something');
    account.clear();
    account
      .should('have.class', 'ng-invalid')
      .should('have.class', 'is-invalid');
    account
      .parent()
      .get('.invalid-feedback')
      .contains('This field is required');

    // check if the amount field is required
    let amount = getAmount();
    amount.type('123');
    amount.clear();
    amount
      .should('have.class', 'ng-invalid')
      .should('have.class', 'is-invalid');

    // check if throws error for negative value
    amount.type('-100');
    amount
      .should('have.class', 'ng-invalid')
      .should('have.class', 'is-invalid');
    amount
      .parent()
      .get('.invalid-feedback')
      .contains('Amount cannot be negative');

    // check if not enough error is thrown
    amount = getAmount();
    amount.clear();
    amount.type('10000');
    amount
      .should('have.class', 'ng-invalid')
      .should('have.class', 'is-invalid');
    amount
      .parent()
      .get('.invalid-feedback')
      .contains('There is not enough balance');
  });

  it('should transfer amount and show in transactions', () => {
    getToAccount().type('Kirankumar');
    getAmount().type('1000');
    getMakeTransferBtn().click().wait(500);

    // click confirm transfer button
    getConfirmTransferBtn().click();

    // check if entry shows in the transaction list
    getFilterInput().type('kumar');
    getTransactionMerchantName().contains('Kirankumar');
    getTransactionType().contains('Online Transfer');
    getTransactionAmount().contains('€1,000');
  });
});
