basic.showIcon(IconNames.Heart)
serial.writeLine("starting iot node code")

interface SensorData {
    sensorName: string;
    sensorType: string;
    pinNumber: number;

    value: number;
    units: string; 

    timeStamp: string;
}
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
interface SensorBuilder {
    setId(theId: number): SensorBuilder;

    setName(theName: string): SensorBuilder;

    setPinNumber(thePinNumber: number): SensorBuilder;

    setUnits(theUnits: string): SensorBuilder;

    setReportingInterval(theReportingInterval: number): SensorBuilder;

    setSensorBehavior(theSensorBehavior: SensorBehavior): SensorBuilder;

    build(): Sensor;
}
interface SensorBehavior {
    getSensorTypeName(): string;
    readValue(pinNumber: number): number;
}
class NullSensorBehavior implements SensorBehavior {
    getSensorTypeName(): string {
        return '';
    }

    readValue(pinNumber: number): number {
        return 0;
    }
}
class MockSensorBehavior implements SensorBehavior {
    getSensorTypeName(): string {
        return 'fake sensor'
    }

    readValue(pinNumber: number): number {
        return 0;
    }
}
interface Reporter {
    report(data: any): void;
}
class RadioReporterImpl implements Reporter {
    report(data: any): void {
        radio.sendString(this.encodeData(data));
    }

    encodeData(data: any) {
        return JSON.stringify(data);
    }
}
class SerialReporterImpl implements Reporter {
    report(data: any): void {
        serial.writeLine((JSON.stringify(data)));
    }
}
class MicrobitNodeImpl implements MicrobitNode {
    sensors: Sensor[];
    
    constructor() {
        this.sensors = [];
    }

    addSensor(newSensor: Sensor) {
        this.sensors.push(newSensor);
    }
}
interface MicrobitNode {
    addSensor(sensor: Sensor): void;
}
const primaryReporter: Reporter = new SerialReporterImpl();
const sensorBuilder: SensorBuilder = new SensorImplBuilder();
sensorBuilder.setId(0);
sensorBuilder.setName("dummy")
sensorBuilder.setPinNumber(0);
sensorBuilder.setReportingInterval(3000);
sensorBuilder.setUnits("un");
sensorBuilder.setSensorBehavior(new MockSensorBehavior());
const fakeSensor: Sensor = sensorBuilder.build();
fakeSensor.addReporter(primaryReporter);
const microbitNode = new MicrobitNodeImpl();
microbitNode.addSensor(fakeSensor);
primaryReporter.report(fakeSensor.readSensorData());
basic.forever(function () {
	
})
control.inBackground(function () {
	
})
