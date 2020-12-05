interface SensorBuilder {
    setId(theId: number): SensorBuilder;

    setName(theName: string): SensorBuilder;

    setPinNumber(thePinNumber: number): SensorBuilder;

    setUnits(theUnits: string): SensorBuilder;

    setReportingInterval(theReportingInterval: number): SensorBuilder;

    setSensorBehavior(theSensorBehavior: SensorBehavior): SensorBuilder;

    build(): Sensor;
}