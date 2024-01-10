export enum IonToleranceUnit {
    Da = 'Da',
    PPM = 'ppm',
}

export class SearchParameters {
    fragmentIonToleranceUnitOptions: string[] = ['ppm', 'Da'];
    precursorIonToleranceUnitOptions: string[] = ['ppm', 'Da'];
    fragmentIonToleranceUnitSelection: string = 'ppm';
    precursorIonToleranceUnitSelection: string = 'Da';
    fragmentIonTolerance: number = 10;
    precursorIonTolerance: number = 0.1;

    unitSelectionChange(unit: string, inputTarget: string) {
        if (inputTarget == 'fragmentIonTolerance') {
            if (unit != this.fragmentIonToleranceUnitSelection) {
                if (unit == IonToleranceUnit.PPM) {
                    this.fragmentIonTolerance = 10;
                } else if (unit == IonToleranceUnit.Da) {
                    this.fragmentIonTolerance = 0.1;
                }
            }
        } else if (inputTarget == 'precursorIonTolerance') {
            if (unit != this.precursorIonToleranceUnitSelection) {
                if (unit == IonToleranceUnit.PPM) {
                    this.precursorIonTolerance = 10;
                } else if (unit == IonToleranceUnit.Da) {
                    this.precursorIonTolerance = 0.1;
                }
            }
        }
    }

    checkToleranceInput(
        unit: string,
        toleranceInput: number,
        inputTarget: string
    ) {
        var adjustedInput: number;
        if (unit == IonToleranceUnit.PPM) {
            if (toleranceInput < 0) {
                adjustedInput = 0;
            } else if (toleranceInput > 1000) {
                adjustedInput = 1000;
            } else if (toleranceInput == undefined) {
                adjustedInput = 0;
            } else {
                adjustedInput = Math.round(toleranceInput);
            }
        } else if (unit == IonToleranceUnit.Da) {
            if (toleranceInput < 0.001) {
                adjustedInput = 0.001;
            } else if (toleranceInput > 1) {
                adjustedInput = 1;
            } else if (toleranceInput == undefined) {
                adjustedInput = 0.001;
            } else {
                adjustedInput = parseFloat(toleranceInput.toPrecision(5));
            }
        }

        if (inputTarget === 'fragmentIonTolerance') {
            this.fragmentIonTolerance = adjustedInput;
        } else if (inputTarget === 'precursorIonTolerance') {
            this.precursorIonTolerance = adjustedInput;
        }
    }
}