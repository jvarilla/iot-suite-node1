class MockSensorBehavior implements SensorBehavior {
    getSensorTypeName(): string {
        return 'fake sensor'
    }

    readValue(pinNumber: number): number {
        return 0;
    }
}