
/// <reference types="cypress" />

context('Dev Finances', () => {
    
		//entender o fluxo manualmente
        //mapear os elementos que vamos interagir
        //descrever as interações com o cypress
        //adicionar as asserções que precisamos

    beforeEach(() => {
        cy.visit('https://dev-finance.netlify.app/');
        cy.get('#data-table tbody tr').should('have.length', 0)
    });
    it('Cadastrar entradas', () => {
        
        cy.get('#transaction .button').click() // id + classe
        cy.get('#description').type('Presente') // id
        cy.get('[name=amount]').type(12) // atributos
        cy.get('[type=date]').type('2023-02-26') // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor

        //tamanho da tabela
        cy.get('#data-table tbody tr').should('have.length', 1)
    });

    it('Cadastrar saidas', () => {
       
        cy.get('#transaction .button').click() // id + classe
        cy.get('#description').type('Presente') // id
        cy.get('[name=amount]').type(-12) // atributos
        cy.get('[type=date]').type('2023-02-26') // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor

        //tamanho da tabela
        cy.get('#data-table tbody tr').should('have.length', 1)
    });
    
    it('Remover entradas e saidas', () => {
        const entrada = 'Mesada'
        const saida = 'Boleto'

        cy.get('#transaction .button').click() // id + classe
        cy.get('#description').type(entrada) // id
        cy.get('[name=amount]').type(150) // atributos
        cy.get('[type=date]').type('2023-02-26') // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor

        cy.get('#transaction .button').click() // id + classe
        cy.get('#description').type(saida) // id
        cy.get('[name=amount]').type(-50) // atributos
        cy.get('[type=date]').type('2023-02-26') // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor

        // estrategia 1: voltar para elemento pai, e avançar para um td -> img -> atributo

        cy.get('td.description')
            .contains(entrada)
            .parent()
            .find('img[onclick*=remove]')
            .click()

        // estrategia 2: buscar todos os irmaos, e buscar o que tem img + atributos

        cy.get('td.description')
            .contains(saida)
            .siblings()
            .children('img[onclick*=remove]')
            .click()

        cy.get('#data-table tbody tr').should('have.length', 0)

   
    });
        
}); 
    
