import {
      addJourney,
      checkJourney,
      getJourney,
      searchJourney  
    } 
    from '../service/journeyService.js';

import Journey from '../models/journeyModel.js';
  
  jest.mock('../models/journeyModel.js', () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
  }));
  
  describe('journeyService', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('addJourney', () => {
      it('Create a Journey', async () => {
        const newJourneyMock = {
          
          busNumber: "TNH250715",
          availableSeats: 30,
          date: "2024-02-24",
          boardingPoint: "trichy",
          droppingPoint: "ooty",
          departureTime: "12:00",
          arrivalTime: "06:30",
          price: 200
        };
        const JourneyMock = {
          _id: 'Id',
          ...newJourneyMock
        };
  
        Journey.create.mockResolvedValue(JourneyMock);
  
        const result = await addJourney(
            newJourneyMock.busNumber,
            newJourneyMock.availableSeats,
            newJourneyMock.date,
            newJourneyMock.boardingPoint,
            newJourneyMock.droppingPoint,
            newJourneyMock.departureTime,
            newJourneyMock.arrivalTime,
            newJourneyMock.price
        );
  
        expect(Journey.create).toHaveBeenCalledWith({
          busNumber: newJourneyMock.busNumber,
          availableSeats: newJourneyMock.availableSeats,
          date: newJourneyMock.date,
          boardingPoint: newJourneyMock.boardingPoint,
          droppingPoint:newJourneyMock.droppingPoint,
          departureTime: newJourneyMock.departureTime,
          arrivalTime: newJourneyMock.arrivalTime,
          price:newJourneyMock.price,
        });
  
        expect(result).toEqual(JourneyMock);
      });
    });
  
    describe('searchJourney', () => {
      it('Search journeys based on boardingPoint, droppingPoint, and date', async () => {
        const boardingPoint = 'Trichy';
        const droppingPoint = 'Ooty';
        const date = '2024-02-24';
  
        const journeysMocksMock = [
          {
            _id: 'journey1',
            busNumber: 'TNH250715',
            date: '2024-02-24',
          },
          {
            _id: 'journey2',
            busNumber: 'TNN250715',
            date: '2024-02-24',
          },
        ];
  
        Journey.find.mockResolvedValue(journeysMocksMock);
  
        const result = await searchJourney(boardingPoint, droppingPoint, date);
  
        expect(Journey.find).toHaveBeenCalledWith({
          boardingPoint: { $regex: boardingPoint, $options: 'i' },
          droppingPoint: { $regex: droppingPoint, $options: 'i' },
          date: date,
        });
  
        expect(result).toEqual(journeysMocksMock);
      });
    });
  });
 
  
  
  