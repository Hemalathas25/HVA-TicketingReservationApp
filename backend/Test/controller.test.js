import { createJourney, getJourneyById, searchBus } from '../controllers/journeyController.js';
import * as journeyService from '../service/journeyService.js';
import * as validationMiddleware from '../middleWare/validationMiddleWare.js';

jest.mock('../service/journeyService.js');
jest.mock('../middleWare/validationMiddleWare.js');

describe('createJourney', () => {
  it('should return 400 with error message if journey already exists', async () => {
    const req = {
    body: {
    busNumber: "TNN250715",
    availableSeats: 30,
    date: "2024-02-24",
    boardingPoint: "trichy",
    droppingPoint: "ooty",
    departureTime: "12:00",
    arrivalTime: "06:30",
    price: 200
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const checkJourneyMock = jest.fn(() => Promise.resolve({ busNumber: 'TNN250715', date: '2024-02-24' }));
    journeyService.checkJourney = checkJourneyMock;
    validationMiddleware.journeyValidation = jest.fn(() => ({ error: null, value: req.body }));
    await createJourney(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Journey already exists' });
  });

  it('should return 200 with journey details if journey is added successfully', async () => {
    const req = {
    body: {
    busNumber: "TNH250715",
    availableSeats: 30,
    date: "2024-02-24",
    boardingPoint: "trichy",
    droppingPoint: "ooty",
    departureTime: "12:00",
    arrivalTime: "06:30",
    price: 200
    }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const checkJourneyMock = jest.fn(() => Promise.resolve(null));
    journeyService.checkJourney = checkJourneyMock;
    journeyService.addJourney = jest.fn(() => Promise.resolve({
        busNumber: "TNH250715",
        availableSeats: 30,
        date: "2024-02-24",
        boardingPoint: "trichy",
        droppingPoint: "ooty",
        departureTime: "12:00",
        arrivalTime: "06:30",
        price: 200 }));
    validationMiddleware.journeyValidation = jest.fn(() => ({ error: null, value: req.body }));
    await createJourney(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        busNumber: "TNH250715",
        availableSeats: 30,
        date: "2024-02-24",
        boardingPoint: "trichy",
        droppingPoint: "ooty",
        departureTime: "12:00",
        arrivalTime: "06:30",
        price: 200
    });
  });
});

describe('getJourneyById', () => {
  it('should return 200 with journey details if journey is found', async () => {
    const req = {
      params: {
        id: '1'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    journeyService.getJourney = jest.fn(() => Promise.resolve({ 
        id: '1',
        busNumber: "TNH250715",
        availableSeats: 30,
        date: "2024-02-24",
        boardingPoint: "trichy",
        droppingPoint: "ooty",
        departureTime: "12:00",
        arrivalTime: "06:30",
        price: 200
      }));

    await getJourneyById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
         id: '1', 
         busNumber: "TNH250715",
        availableSeats: 30,
        date: "2024-02-24",
        boardingPoint: "trichy",
        droppingPoint: "ooty",
        departureTime: "12:00",
        arrivalTime: "06:30",
        price: 200
       });
  });

  it('should return 404 with message if journey is not found', async () => {
    const req = {
      params: {
        id: '1'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    journeyService.getJourney = jest.fn(() => Promise.resolve(null));
    await getJourneyById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Journey not found' });
  });
});

describe('SearchBus', () => {
  it('should return 404 with message if no buses are available', async () => {
    const req = {
      query: {
        from: 'Trichy',
        to: 'Ooty',
        date: '2024-02-24'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    validationMiddleware.searchValidation = jest.fn(() => ({ error: null, value: req.query }));
    journeyService.searchJourney = jest.fn(() => Promise.resolve([]));
    await searchBus(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
   /// expect(res.json).toHaveBeenCalledWith({ message:'No buses available'});
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringMatching(/^No\s+buses\s+available$/) }));
  });


it('should return 200 with buses if buses are available', async () => {

const req = {
    query: {
      from: 'Trichy',
      to: 'Ooty',
      date: '2024-02-24'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  validationMiddleware.searchValidation = jest.fn(() => ({ error: null, value: req.query }));
  journeyService.searchJourney = jest.fn(() => Promise.resolve([
    {
      id: '1',
    busNumber: "TNH250715",
    availableSeats: 30,
    date: "2024-02-24",
    boardingPoint: "trichy",
    droppingPoint: "ooty",
    departureTime: "12:00",
    arrivalTime: "18:30",
    price: 200
    },
    {
      id: '2',
    busNumber: "TNN250715",
    availableSeats: 30,
    date: "2024-02-24",
    boardingPoint: "trichy",
    droppingPoint: "ooty",
    departureTime: "15:00",
    arrivalTime: "19:30",
    price: 200
    }
  ]));
  await searchBus(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith([
    {
        id: '1',
        busNumber: "TNH250715",
        availableSeats: 30,
        date: "2024-02-24",
        boardingPoint: "trichy",
        droppingPoint: "ooty",
        departureTime: "12:00",
        arrivalTime: "18:30",
        price: 200
    },
    {
        id: '2',
        busNumber: "TNN250715",
        availableSeats: 30,
        date: "2024-02-24",
        boardingPoint: "trichy",
        droppingPoint: "ooty",
        departureTime: "15:00",
        arrivalTime: "19:30",
        price: 200
    }
  ]);
});
})