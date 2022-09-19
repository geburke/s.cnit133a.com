/// <reference types="cypress" />

const prod_url = 'https://cnit133a.com'
const staging_url = 'https://s.cnit133a.com'
const file_name = "./../../../hw3/hw3.html";
const data_file = "./hw3/hw3data.json";

/*
cy.exec(`pwd`)
 .then( (result) => {
  cy.log(result.stderr);
  cy.log(result.stdout);
 });

 */


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

        cy.log("moo->", cy.get('@my_data'));
    });

      url = get_url();
      cy.log("url:", url)
      cy.visit(url)
  });

  it('check for ids', () => {
    cy.get('@my_data').then(d => {
      for (let line of d) {
          cy.log("line:", line);
          cy.log("id:", line.term.toLowerCase().replace(' ','_'));
      }
      d.map(i => {
        let my_id = i.term.toLowerCase().replace(' ', '_');
        cy.get('svg').within(() => {
          //cy.get("rect[id='" + my_id + "']").then(rect => {
          //  cy.log("Width : "+rect.attr("width"));
          //  cy.log("Height : "+rect.attr("height"));
          //});
          cy.get("rect[id='" + my_id + "']")
            .should('exist');

        }); 
      });

        //cy.get( rect > + '#' + my_id)
        //cy.get( rect )
        //  .should('exist');
    });
  });

  it('check for tools tips', () => {
    cy.get('@my_data').then(d => {
      d.map(i => {
        let my_id = i.term.toLowerCase().replace(' ', '_');
        cy.get('svg').within(() => {
          cy.get("rect[id='" + my_id + "']").BEEERS_ARE_GOOD();
          cy.get("rect[id='" + my_id + "']")
            .realHover();
          cy.get("#" + "tt_" + i.term.toLowerCase().replace(' ', '_'))
            .should("be.visble")
            .and('contain.text', i.students)

        }); 
      });
    });

        //cy.get( rect > + '#' + my_id)
        //cy.get( rect )
        //  .should('exist');
    });
 /*
    for( let my_id of my_data.map((i) => { i.term.toLowerCase().replace(' ','_')})) {
      cy.get( rect > + '#' + my_id)
        .should('exist');
    }
  });
  */

  /*

  it('Check h2 cert text', () => {
    cy.get('.content ul li').each(element => {
      expect(element.text()).to.be.oneOf(my_certs);
    })
  })

  it('check for hrefs', () => {
    cy.get('.content ul li a').each(element => {
      let my_id = make_id(element.text())
      expect(element.attr('href')).to.be.equal("#" + my_id)

    })
  })
  it('check for ids', () => {
    let tmp_my_certs = my_certs
    for( let cert_name of my_certs)  {
      let my_id = make_id(cert_name)

      cy.get('#' + my_id).invoke('text').then((text) => {
        expect(text).to.be.oneOf(tmp_my_certs)
        //remove the matched cert
        tmp_my_certs = tmp_my_certs.filter(item => item !== text)
      });
    }
  });

  */
});