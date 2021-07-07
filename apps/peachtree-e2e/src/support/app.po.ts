export const getAssignment = () => cy.get('[data-test-hook=assignmentName]');
export const getFilterInput = () => cy.get('#transactions');
export const getTransactionDate = () =>
  cy.get('[data-test-hook=transactionDate]');
export const getTransactionMerchantName = () =>
  cy.get('[data-test-hook=transactionMerchantName]');
export const getTransactionType = () =>
  cy.get('[data-test-hook=transactionType]');
export const getTransactionAmount = () =>
  cy.get('[data-test-hook=transactionAmount]');
export const getToAccount = () => cy.get('#toAccount');
export const getAmount = () => cy.get('#amount');
export const getMakeTransferBtn = () => cy.get('[data-test-hook=makeTransfer]');
export const getConfirmTransferBtn = () =>
  cy.get('[data-test-hook=confirmTransfer]');
