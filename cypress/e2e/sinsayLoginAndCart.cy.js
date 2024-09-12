describe('User Registration, Login and Cart Functionality', () => {
    const user = {
      email: 'testabc123@abc.com',
      password: '123456'
    };
  
    describe('User Login Scenarios', () => {
      beforeEach(() => {
        cy.visit('/');
        cy.get('#cookiebotDialogOkButton').click({ force: true });
      });
  
      it('Scenario I - Successful Login and Redirection', () => {
        cy.visit('/customer/account/login');
        cy.get('input[name="login[username]"]').type(user.email);
        cy.get('input[name="login[password]"]').type(user.password);
        cy.get('[data-selen="login-submit"]').click();
  
        // Close the newsletter popup if it's visible
        cy.get('.ds-button__light > .ds-icon').then(($el) => {
          if ($el.is(':visible')) {
            cy.wrap($el).click({ force: true });
          }
        });
  
        cy.get('a.ds-link').should('contain', 'Testing');
        cy.url().should('include', '/');
      });
  
      it('Scenario II - Invalid Login (Incorrect Email or Password)', () => {
        cy.visit('/customer/account/login');
        cy.get('input[name="login[username]"]').type('wrong_email@example.com');
        cy.get('input[name="login[password]"]').type('wrong_password');
        cy.get('[data-selen="login-submit"]').click();
        cy.get('.sc-gYhhMS').should('be.visible');
      });
  
      it('Scenario III - Invalid Email Format', () => {
        cy.visit('/customer/account/login');
        cy.get('input[name="login[username]"]').type('invalidemail.com');
        cy.get('input[name="login[password]"]').type('some_password');
        cy.get('[data-selen="login-submit"]').click();
        cy.get('.text-field__ErrorMessage-sc-1vll61a-5').should('be.visible');
      });
    });
  
    describe('Product Search and Cart Functionality', () => {
      beforeEach(() => {
        cy.visit('/');
        cy.get('#cookiebotDialogOkButton').click({ force: true });
      });
  
      it('Scenario IV - Search, Add to Cart, Remove from Cart', () => {
        cy.visit('/customer/account/login');
        cy.get('input[name="login[username]"]').type(user.email);
        cy.get('input[name="login[password]"]').type(user.password);
        cy.get('[data-selen="login-submit"]').click();
  
        // Close the newsletter popup if it's visible
        cy.get('body').then(($body) => {
          if ($body.find('.ds-button__light > .ds-icon').length > 0) {
            cy.get('.ds-button__light > .ds-icon').click({ force: true });
          }
        });
  
        // Assert the user is redirected to the cart page
        cy.get('a.ds-link').should('contain', 'Testing');
        cy.visit('/checkout/cart');
  
        // Check if the cart is empty or contains items
        cy.get('body').then(($body) => {
          if ($body.find('[data-selen="empty-cart"]').length > 0) {
            // If the empty cart element exists, assert it
            cy.get('[data-selen="empty-cart"]', { timeout: 10000 }).should('exist');
          } else if ($body.find('.ds-badge-text').length > 0) {
            // If there are items in the cart, remove them
            cy.get('.product-list__RemoveButton-mh8fks-8', { timeout: 10000 }).click();
            // Assert the cart is empty
            cy.get('[data-selen="empty-cart"]', { timeout: 10000 }).should('exist');
          }
        });
  
        // Search for a product
        cy.get('#algoliaButton').type('8470j-00x{enter}');
        cy.get('.AlgoliaProducts-module__algolia-products-container', { timeout: 10000 }).should('contain', '8470j-00x');
        cy.get('.ds-product-tile-img', { timeout: 10000 }).click();
  
        // Select size M
        cy.get('ul[data-testid="product-size-group"]', { timeout: 10000 })
          .contains('M')
          .click();
  
        // Add to cart
        cy.get('[data-testid="add-to-cart-button"]').click();
  
        // Go to cart
        cy.get('[data-testid="cart-confirmation-go-to-cart"]', { timeout: 10000 }).click();
  
        // Remove the product from the cart
        cy.get('.product-list__RemoveButton-mh8fks-8', { timeout: 10000 }).click();
        cy.get('[data-selen="empty-cart"]', { timeout: 10000 }).should('exist');
      });
    });
  });
  