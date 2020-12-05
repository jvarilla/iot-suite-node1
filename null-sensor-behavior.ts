class NullSensorBehavior implements SensorBehavior {
    getSensorTypeName(): string {
        return '';
    }

    readValue(pinNumber: number): number {
        return 0;
    }
}