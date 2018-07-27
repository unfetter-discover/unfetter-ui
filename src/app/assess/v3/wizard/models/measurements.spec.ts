import { Measurement } from './measurement';
import { Measurements } from './measurements';

describe('Measurements', () => {

  let measurementsService;
  beforeEach(() => {
    measurementsService = new Measurements();
  });

  it('should create', () => {
    expect(measurementsService).toBeTruthy();
  });

  it('should create measurements for course of action', () => {

    const expectedFirstQuestions = [
      'No Policy',
      'Not Implemented',
      'Not Automated',
      'Not Reported'
    ];
    const measurements = measurementsService.buildMeasurements('course-of-action--1234123');

    expect(measurements);
    expect(Array.isArray(measurements)).toBeTruthy();
    expect(measurements.length).toBe(4);

    let curArrayIndex = 0;
    const spotCheckFirstQuestion = (measurement: Measurement, expectedFirstQuestion: string) => {
      expect(measurements[curArrayIndex]).toBeDefined();
      expect(measurements[curArrayIndex].options).toBeDefined();
      expect(measurements[curArrayIndex].options[0].name).toEqual(expectedFirstQuestions[curArrayIndex]);
      expect(measurements[curArrayIndex].options[0].risk).toEqual(1);
    };

    // spot check the first questions
    spotCheckFirstQuestion(measurements[curArrayIndex], expectedFirstQuestions[curArrayIndex]);
    curArrayIndex = 1;
    spotCheckFirstQuestion(measurements[curArrayIndex], expectedFirstQuestions[curArrayIndex]);
    curArrayIndex = 2;
    spotCheckFirstQuestion(measurements[curArrayIndex], expectedFirstQuestions[curArrayIndex]);
    curArrayIndex = 3;
    spotCheckFirstQuestion(measurements[curArrayIndex], expectedFirstQuestions[curArrayIndex]);
  });

  it('should create measurements for indicator', () => {
    const expectedQuestions = [
      'Nothing',
      'Local Logging',
      'Central Logging, No Alerting',
      'Alerting, but false positives/negatives',
      'Real Time Alerting, No False Positives/Negatives',
    ];
    const expectedRisks = [1, .75, .50, .25, 0];
    const measurements = measurementsService.buildMeasurements('indicator--1234123');

    expect(measurements);
    expect(Array.isArray(measurements)).toBeTruthy();
    expect(measurements.length).toBe(1);

    expect(measurements[0]).toBeDefined();
    expect(measurements[0].options).toBeDefined();
    expect(measurements[0].options.length).toEqual(5);
    // check measurements and risks for first question
    for (let curMeasurementIndex = 0; curMeasurementIndex < 5; curMeasurementIndex++) {
      expect(measurements[0].options[curMeasurementIndex].name).toEqual(expectedQuestions[curMeasurementIndex]);
      expect(measurements[0].options[curMeasurementIndex].risk).toEqual(expectedRisks[curMeasurementIndex]);
    }

  });

  it('should create measurements for capability', () => {
    const expectedQuestions = [
      'no coverage',
      'some coverage',
      'half coverage',
      'most critical systems covered',
      'all critical systems covered',
    ];
    const expectedRisks = [1, .75, .50, .25, 0];
    const measurements = measurementsService.buildMeasurements('x-unfetter-assessment-set--1234123');

    expect(measurements);
    expect(Array.isArray(measurements)).toBeTruthy();
    expect(measurements.length).toBe(1);

    expect(measurements[0]).toBeDefined();
    expect(measurements[0].options).toBeDefined();
    expect(measurements[0].options.length).toEqual(5);
    // check measurements and risks for first question
    for (let curMeasurementIndex = 0; curMeasurementIndex < 5; curMeasurementIndex++) {
      expect(measurements[0].options[curMeasurementIndex].name).toEqual(expectedQuestions[curMeasurementIndex]);
      expect(measurements[0].options[curMeasurementIndex].risk).toEqual(expectedRisks[curMeasurementIndex]);
    }

  });

  it('should create format the risk string', () => {
    const risk = .0513413;
    const formatted = measurementsService.displayRisk(risk);
    expect(formatted).toBeDefined();
    expect(formatted).toEqual('5.13');
  });

  it('should create calculate risk', () => {
    const genRiskObj = (risk: number) => {
      return {
        risk
      };
    }
    const assessments = [
      genRiskObj(1),
      genRiskObj(1),
      genRiskObj(.5),
      genRiskObj(0),
      genRiskObj(0),
    ];
    const calc = measurementsService.calculateRisk(assessments);
    expect(calc).toBeDefined();
    expect(calc).toEqual(.5);
  });

  it('should create a single measurement', () => {
    const options = ['low', 'medium', 'high'];
    const measurement: Measurement = measurementsService.createMeasurement('question1', -1, options);
    expect(measurement).toBeDefined();
    expect(measurement.name).toEqual('question1');
    expect(measurement.options).toBeDefined();
    expect(measurement.options.length).toBe(3);
    expect(measurement.options[0].name).toBe('low');
    expect(measurement.options[0].risk).toBe(1);
  });

  it('should get a given measurements selected risk', () => {
    const options = ['low', 'medium', 'high'];
    const measurement1: Measurement = measurementsService.createMeasurement('question1', 0, options);
    expect(measurement1).toBeDefined();
    expect(measurement1.name).toEqual('question1');
    expect(measurement1.options).toBeDefined();
    expect(measurement1.options.length).toBe(3);
    expect(measurement1.selected_value.name).toEqual('low');
    expect(measurement1.selected_value.risk).toEqual(1);

    const measurement2: Measurement = measurementsService.createMeasurement('question2', 2, options);
    expect(measurement2).toBeDefined();
    expect(measurement2.name).toEqual('question2');
    expect(measurement2.options).toBeDefined();
    expect(measurement2.options.length).toBe(3);
    expect(measurement2.selected_value.name).toEqual('high');
    expect(measurement2.selected_value.risk).toEqual(0);

    const selectedRisk = measurementsService.getRisk([measurement1, measurement2]);
    expect(selectedRisk).toBeDefined();
    expect(selectedRisk).toEqual(.5);
  });

});
