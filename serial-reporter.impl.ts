class SerialReporterImpl implements Reporter {
    report(data: any): void {
        serial.writeLine((JSON.stringify(data)));
    }
}