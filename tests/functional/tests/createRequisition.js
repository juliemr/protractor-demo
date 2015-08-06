'use strict';
var LoginPage = require('../pages/LoginPage.js');
var DesktopPage = require('../pages/DesktopPage.js');
var CreateRequisitionPage = require('../pages/CreateRequisitionPage.js');
var page = new CreateRequisitionPage();
var fs = require('fs');

describe('create requisition page', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.get().then(function () {
            return loginPage.submitLoginExpectingSuccess();
        }).then(function(mainPage) {
            page.waitElementToBeShown(page.logo);
            return mainPage.header.requisitionsMenu.createRequisition();
        }).then(function(nextPage) {
            page = nextPage
            page.waitElementToBeShown(page.logo);
        });
    });


    it('should have the correct fields present', function () {
        expect(page.manager.isPresent()).toBeTruthy();
        expect(page.recruiter.isPresent()).toBeTruthy();
        expect(page.employmentType.isPresent()).toBeTruthy();
        expect(page.driversLicence.isPresent()).toBeTruthy();
        expect(page.jobCategory.isPresent()).toBeTruthy();
        expect(page.position.isPresent()).toBeTruthy();
        expect(page.categories.isPresent()).toBeTruthy();
        expect(page.region.isPresent()).toBeTruthy();
        expect(page.area.isPresent()).toBeTruthy();
        expect(page.geographicDepartment.isPresent()).toBeTruthy();
        expect(page.agency.isPresent()).toBeTruthy();
        expect(page.postingLocation.isPresent()).toBeTruthy();
        expect(page.requisitionId.isPresent()).toBeTruthy();
        expect(page.title.isPresent()).toBeTruthy();
        expect(page.numberOfPositions.isPresent()).toBeTruthy();
        expect(page.categoryCode.isPresent()).toBeTruthy();
        expect(page.startDate.isPresent()).toBeTruthy();
        expect(page.endDate.isPresent()).toBeTruthy();
        expect(page.ok.isPresent()).toBeTruthy();
        expect(page.back.isPresent()).toBeTruthy();
    });


    it('should not show error for user that does fill out required fields', function() {
        page.setManager('lu',0).then(function() {
            return page.clearRecruiter()
        }).then(function() {
            return page.addRecruiter(0);
        }).then(function() {
            return page.select('employmentType', 2);                    //set employment type to full-time/part-time
        }).then(function() {
            return page.select('driversLicense', 2);                    //set drivers licence to non-exempt
        }).then(function() {
            return page.select('jobCategory', 1);                       //set the job category to test
        }).then(function() {
            return page.select('position', 1);                          //set the position to a test position
        }).then(function() {
            return page.select('categories', 1);                        //set the category to sales worker
        }).then(function() {
            return page.select('region', 1)                             //set the region/country to United States
        }).then(function() {
            return page.select('area', 11);                             //set area/state to be Georgia
        }).then(function() {
            return page.select('geographicDepartment', 3);              //set the city to Athens
        }).then(function() {
            return page.select('agency', 5);                            //set agency/zip-code to 30605
        }).then(function() {
            return page.write('postingLocation', 'Athens, Georgia, US');//set the posting location to athens, ga, us
        }).then(function() {
            return page.write('title', 'testTitle')                     //set the title to test_title
        }).then(function() {
            return page.write('numberOfPositions', '99');               //set the number of positions to 99
        }).then(function() {
            return page.addCategoryCode([0,1,2]);                       //add 3 category code
        }).then(function() {
            return page.write('startDate', '05/01/1994')                //set the start date to 05/01/1994
        }).then(function() {
            return page.write('endDate', '12/31/2099')                  //set the end date to 12/31/2099
        }).then(function() {
            return page.writeToContext('testForContext')                //set the context field to test message
        }).then(function() {
            return page.writeToJobDescription('testForJobDescription'); //set the job description field to test message
        }).then(function() {
            return page.write('negotiatedSalary', '0');                 //set the salary field to 0, since we are mean
        }).then(function() {
            return page.write('grade', 'N/A');                          //set the grade to N/A, since salary == 0
        }).then(function() {
            return page.submit();
        }).then(function(result) {
            page = result;
        }).then(function() {
            page.waitElementToBeShown(page.logo);
            expect(element(by.css('.section-header')).isPresent()).toBeTruthy();
            expect(element(by.css('.section-header .n')).getText()).toBe('testTitle');
            expect(element(by.css('.tbl_l-bit-box-deletable')).getText()).toBe('Administrator LUCEO');
        });
    });

    it('should show error for user that does not fill out required fields', function() {
        page.submit().then(function(newPage) {
            page = newPage;
            return page.waitElementToBeShown(page.manager)
        }).then(function() {
            expect(page.error.isPresent()).toBeTruthy();
        });
    });

    it('should have the date fields correctly formatted', function () {
        expect(page.startDate.getAttribute('value')).toBe('MM/DD/YYYY');
        expect(page.endDate.getAttribute('value')).toBe('MM/DD/YYYY');
    });


});