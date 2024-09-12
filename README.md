# Automated Tests for Sinsay with Cypress

## Overview
This small project implements automated UI tests using Cypress for the [Sinsay website](https://www.sinsay.com/pl/pl/).

**Note**: This project was created for educational purposes. It may be expanded with more features or test cases in the future.

## Test Scenarios
The following test cases are implemented:

1. **Scenario I – User Login (Successful)**:
   - Navigate to the login page.
   - Fill in the form with valid credentials and submit.
   - Verify redirection to the homepage.
   - Verify that the user's name appears in the top-right corner.

2. **Scenario II – Invalid Login (Incorrect Credentials)**:
   - Navigate to the login page.
   - Fill in the form with incorrect email or password and submit.
   - Verify that an error message is displayed.

3. **Scenario III – Invalid Email Format**:
   - Navigate to the login page.
   - Fill in the form with an invalid email (e.g., missing "@" symbol).
   - Verify that the correct validation message is displayed.

4. **Scenario IV – Product Search, Add to Cart, and Remove from Cart**:
   - Ensure the user is logged in.
   - Ensure the cart is empty.
   - Search for a product ID.
   - Navigate to the product page.
   - Select size.
   - Add the product to the cart.
   - Verify the product is added to the cart.
   - Navigate to the cart.
   - Remove the product from the cart.
   - Verify the cart is empty.
