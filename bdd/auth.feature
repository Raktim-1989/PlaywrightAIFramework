Feature: Authentication

  Scenario: Valid login with correct credentials
    Given the user is on the login page
    When the user enters valid username and password
    And clicks the login button
    Then the user should be redirected to the dashboard

  Scenario: Invalid login with wrong password
    Given the user is on the login page
    When the user enters valid username and invalid password
    And clicks the login button
    Then an error message should be displayed

  Scenario: Invalid login with wrong username
    Given the user is on the login page
    When the user enters invalid username and valid password
    And clicks the login button
    Then an error message should be displayed

  Scenario: Login with empty fields
    Given the user is on the login page
    When the user leaves username and password empty
    And clicks the login button
    Then an error message should be displayed

  Scenario: Logout from dashboard
    Given the user is logged in and on the dashboard
    When the user clicks the logout button
    Then the user should be redirected to the login page

  Scenario: Remember me option
    Given the user is on the login page
    When the user checks the "Remember me" option
    And enters valid credentials
    And clicks the login button
    Then the user should remain logged in after closing and reopening the browser

  Scenario: Forgot password flow
    Given the user is on the login page
    When the user clicks the "Forgot password" link
    Then the user should see the password recovery form

  Scenario: Login with locked account
    Given the user is on the login page
    When the user enters credentials for a locked account
    And clicks the login button
    Then an account locked message should be displayed

  Scenario: Login with expired password
    Given the user is on the login page
    When the user enters credentials with an expired password
    And clicks the login button
    Then the user should be prompted to reset the password

  Scenario: Login with multi-factor authentication
    Given the user is on the login page
    When the user enters valid credentials
    And clicks the login button
    Then the user should be prompted for a multi-factor authentication code
