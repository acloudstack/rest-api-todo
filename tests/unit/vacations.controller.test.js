const VacationsController = require("../../controllers/vacations.controller");
const VacationsModel = require("../../model/vacations.model");
const httpMocks = require("node-mocks-http");
//const newVacation = require("../mock-data/new-vacation.json");
const allVacations = require("../mock-data/all-vacations.json");

jest.mock("../../model/vacations.model");

let req, res, next;
let timeout = 20000;
let vacaionId;

beforeEach(() => {    
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("VacaionsController.getVacattions", () => {
    beforeEach(() => {
        req.body = {};
    });

    it("should have a getVacations function", () => {
        expect(typeof VacationsController.getVacations).toBe("function");
    });
    it("should call VacaionsModel.find({})", async () => {
        VacationsController.getVacations(req, res, next);
        expect(VacationsModel.find).toBeCalledWith({});
    });
    it("should return response with status 200 and all vacaions", async () => {
        VacationsModel.find.mockReturnValue(allVacations);
        await VacationsController.getVacations(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allVacations);
    });
    it("should handle errors in getVacations", async () => {
        const errorMessage = { message: "Error finding" };
        const rejectedPromise = Promise.reject(errorMessage);
        VacationsModel.find.mockReturnValue(rejectedPromise);
        await VacationsController.getVacations(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});
