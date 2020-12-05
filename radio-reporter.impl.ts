class RadioReporterImpl implements Reporter {
    report(data: any): void {
        radio.sendString(this.encodeData(data));
    }

    encodeData(data: any) {
        return JSON.stringify(data);
    }
}