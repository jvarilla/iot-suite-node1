interface Sensor {
    readSensorData(): SensorData;
    addReporter(reporter: Reporter): void 
}