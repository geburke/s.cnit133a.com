/// <reference types="cypress" />

const prod_url = 'https://cnit133a.com'
const staging_url = 'https://s.cnit133a.com'
const file_name = "./../../../hw3/hw3.html";
const data_file = "./hw3/hw3data.json";

let url = ""

function get_url() {
    let branch_name = cy.exec('git rev-parse --abbrev-ref HEAD')
    .toString().trim();

    if (process.argv[2] === "prod" || branch_name === "master") {
        url = prod_url;
    } else if (process.argv[2] === "staging" || branch_name == "dev") {
        url = staging_url;
    } else {
        url = file_name;
    }
    return url;
}

const { elementIsEnabled } = require("selenium-webdriver/lib/until");
const desc = "cnit133a homework 3";

describe(desc, () => {
  beforeEach(() => {
    cy.readFile(data_file)
      .then((my_data) => {
        cy.wrap(my_data).as('my_data');
    });
    url = get_url();
    cy.log("url:", url)
    cy.visit(url)
  });

  it('check for ids', () => {
    cy.get('@my_data').then(d => {
      d.map(i => {
        let my_id = i.term.toLowerCase().replace(' ', '_');
        cy.get('svg').within(() => {
          cy.get("rect[id='" + my_id + "']")
            .should('exist');
        }); 
      });
    });
  });

  it('check for tools tips', () => {
    cy.get('@my_data').then(d => {
      d.map(i => {
        let my_id = i.term.toLowerCase().replace(' ', '_');
        cy.get("rect[id='" + my_id + "']")
          .realHover()
          .wait(399)
          .get("[id='tt_" + i.term.toLowerCase().replace(' ', '_') +"']" )
          .should("be.visible")
          .and('contain.text', i.students)
      });
    });
  });
});