class MicrobitNodeImpl implements MicrobitNode {
    sensors: Sensor[];
    
    constructor() {
        this.sensors = [];
    }

    addSensor(newSensor: Sensor) {
        this.sensors.push(newSensor);
    }
}