describe('Bug Tracker E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the bug list', () => {
    cy.get('[data-testid="bug-list"]').should('exist');
  });

  it('should navigate to add bug form', () => {
    cy.get('[data-testid="add-bug-button"]').click();
    cy.url().should('include', '/add-bug');
    cy.get('h2').should('contain', 'Report New Bug');
  });

  it('should create a new bug', () => {
    cy.get('[data-testid="add-bug-button"]').click();
    
    cy.get('[data-testid="bug-title"]').type('Cypress Test Bug');
    cy.get('[data-testid="bug-description"]').type('This bug was created by Cypress');
    cy.get('[data-testid="bug-status"]').select('in-progress');
    cy.get('[data-testid="submit-bug"]').click();
    
    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains('Cypress Test Bug').should('exist');
    cy.contains('in-progress').should('exist');
  });

  it('should show validation errors', () => {
    cy.get('[data-testid="add-bug-button"]').click();
    cy.get('[data-testid="submit-bug"]').click();
    
    cy.contains('Title is required').should('exist');
    cy.contains('Description is required').should('exist');
  });

  it('should update bug status', () => {
    // First create a bug
    cy.createBug({
      title: 'Status Test Bug',
      description: 'Testing status updates',
      status: 'open'
    });
    
    cy.get('[data-testid="status-select"]').first().select('resolved');
    cy.contains('resolved').should('exist');
  });
});