class SensorImpl implements Sensor {
    sensorId: number;
    sensorName: string;
    
    pinNumber: number;
    units: string; 
    reportingInterval: number; // in ms
    sensorBehavior: SensorBehavior;

    reporters: Reporter[];

    constructor(theSensorId: number, theSensorName: string, thePinNumber: number, 
                theUnits: string, theReportingInterval: number, theSensorBehavior: SensorBehavior) {
            this.sensorId = theSensorId;
            this.sensorName = theSensorName;
            this.pinNumber = thePinNumber;
            this.units = theUnits;
            this.reportingInterval = theReportingInterval;
            this.sensorBehavior = theSensorBehavior;
            this.reporters = [];

            control.setInterval(function() {
                this.reportSensorData();
            }, this.reportingInterval, control.IntervalMode.Interval);
    }

    addReporter(reporter: Reporter): void {
        this.reporters.push(reporter);
    }

    readSensorData(): SensorData {
        const sensorValue = 
            this.sensorBehavior.readValue(this.pinNumber);

        return {
            sensorName: this.sensorName,
            sensorType: this.sensorBehavior.getSensorTypeName(),
            pinNumber: this.pinNumber,
            value: sensorValue,
            units: this.units, 
            timeStamp: control.eventTimestamp().toString()
        } as SensorData;
    }

    reportSensorData(): void{
        // Read Sensor Data
        const sensorData = this.readSensorData();
        // Add Data to Reporting queue
        this.reporters.forEach(reporter => reporter.report(sensorData));
    }

}