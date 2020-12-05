function setup () {
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
}
basic.showIcon(IconNames.Heart)
serial.writeLine("starting iot node code")
setup()
basic.forever(function () {
	
})
control.inBackground(function () {
	
})
