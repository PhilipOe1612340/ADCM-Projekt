const user = "admin";
const password = "adcm";

describe("Hooks", function() {
  before(function() {
    // runs once before all tests in the block
  });

  after(function() {
    // runs once after all tests in the block
  });

  beforeEach(function() {
    cy.visit("http://localhost:8080/#/admin");
    cy.get("#name").type(user);
    cy.get("#first-name").type(password);
    cy.get(".md-card-actions > .md-button > .md-ripple").click();
    Cypress.Cookies.preserveOnce("session_id", "remember_token")
  });

  afterEach(function() {
    // runs after each test in the block
  });
});

describe("admin", function() {
  it("login test", function() {
    cy.visit("http://localhost:8080/#/admin");
    cy.get("#name").type(user);
    cy.get("#first-name").type(password);
    cy.get(".md-card-actions > .md-button > .md-ripple").click();
  });

  it("create test", () => {
    cy.get('.md-speed-dial').click()
    cy.get('div.md-speed-dial.md-bottom-right > div > button:nth-child(1) > div > div > i').click();
  })
});
