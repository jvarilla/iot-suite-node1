class SensorImplBuilder {
    sensorId: number;
    sensorName: string;
    
    pinNumber: number;
    units: string; 
    reportingInterval: number; // in ms
    sensorBehavior: SensorBehavior;

    constructor() {
        this.sensorId = 0;
        this.sensorName = '';
        this.pinNumber = 0;
        this.units = '';
        this.reportingInterval = 0;
        this.sensorBehavior = new NullSensorBehavior();
    }

    setId(theId: number): SensorImplBuilder {
        this.sensorId = theId;
        return this;       
    }

    setName(theName: string): SensorImplBuilder {
        this.sensorName = theName;
        return this;
    }

    setPinNumber(thePinNumber: number): SensorImplBuilder {
        this.pinNumber = thePinNumber;
        return this;
    }

    setUnits(theUnits: string): SensorImplBuilder {
        this.units = theUnits;
        return this;
    }

    setReportingInterval(theReportingInterval: number): SensorImplBuilder {
        this.reportingInterval = theReportingInterval;
        return this;
    }

    setSensorBehavior(theSensorBehavior: SensorBehavior): SensorImplBuilder {
        this.sensorBehavior = theSensorBehavior;
        return this; 
    }

    build() :SensorImpl {
        return new SensorImpl(this.sensorId, this.sensorName, this.pinNumber,
        this.units,this.reportingInterval, this.sensorBehavior);
    }


}