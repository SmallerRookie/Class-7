/// <reference types="cypress" />

describe('Login',function(){
    beforeEach('Login by token',function(){
        cy.LoginAPI().then(function(){
            cy.visit("https://cms-lyart.vercel.app/dashboard/manager",
               {  
                    onBeforeLoad : function(window){                          
                    const token = Cypress.env('cms')
                    window.localStorage.setItem('cms', JSON.stringify({
                    userId:3, 
                    role:'manager', 
                    token: token 
                }));
                }
            })    
        })

        cy.get("div[role='button']").eq(2).click()
        cy.get("a[href*=add]").click({force:true})

        cy.get('#name').type("Testing")
        cy.get("#startTime").click()
        cy.get("[class*='today-btn']").click()
        cy.get("#price").type("5000")
        cy.get('[aria-valuemax="10"]').type('10')
        cy.get('.ant-input-group>.ant-input-number>.ant-input-number-input-wrap>.ant-input-number-input').type('6')
        cy.get('#teacherId').type("kld")
        cy.get("div[title='kldsafd']").click()
        cy.get("div[class*='multiple'] div[class$='selector']").click()
        cy.contains('Python').click()
        var genArr = Array.from({length:10},(k)=>k)
        cy.wrap(genArr).each((index)=>{
            cy.get('#detail').type('HiHiHiHiHi')
        })
        cy.get("input[type='file']").attachFile("html-xxl.png")
        cy.get('.ant-modal-footer > .ant-btn-primary').click()
        cy.contains('Create Course').click()


    })

    it('Intercept Testing',function(){

        cy.intercept({
            method:'POST',
            url:'http://cms.chtoma.com/api/courses'
        },
        { 
            statusCode: 200,
            body:[{
                "data": {
                    "name": "Testing",
                    "uid": "25536d3b-c933-4899-a955-37749429bfb0",
                    "startTime": "2022-04-04",
                    "price": 5000,
                    "maxStudents": 10,
                    "duration": 6,
                    "durationUnit": 2,
                    "type": [
                        {
                            "id": 2,
                            "name": "Python"
                        }
                    ],
                    "scheduleId": 1816,
                    "teacherId": 20,
                    "id": 1504,
                    "star": 0,
                    "teacherName": "kldsafd"
                },
                "code": 201,
                "msg": "success"
            }]
        }).as('intercept')
        
    })
    

})