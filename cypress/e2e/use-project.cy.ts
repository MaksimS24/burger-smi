import '@4tw/cypress-drag-drop';

describe('useProject', () => {
    it('Making an order', () => {
        cy.visit('/');
        cy.intercept('GET', 'data', {fixture: 'ingredients.json'});
        cy.intercept('GET', 'user', {fixture: 'auth-user.json'});

        cy.get('[data-cy="ingredients-643d69a5c3f7b9001cfa093c"]').as('ingredient1');
        cy.get('[data-cy="ingredients-643d69a5c3f7b9001cfa093e"]').as('ingredient2');

        cy.get('@ingredient1').click();
        cy.contains('Детали ингредиента').should('exist').should('have.text', 'Детали ингредиента');
        cy.get('[data-cy="close-modal"]').as('close-modal-btn');
        cy.wait(2000).get('@close-modal-btn').click();

        cy.get('@ingredient1').drag('[data-cy="drop"]');
        cy.get('@ingredient2').drag('[data-cy="drop"]');

        cy.intercept('POST', 'orders', {fixture: 'order.json'});
        cy.get('[data-cy="button-order"]').as('order-button');
        cy.get('@order-button').click();

        cy.wait(2000).get('@close-modal-btn').click();
    })
})