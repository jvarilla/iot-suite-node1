interface SensorBehavior {
    getSensorTypeName(): string;
    readValue(pinNumber: number): number;
}