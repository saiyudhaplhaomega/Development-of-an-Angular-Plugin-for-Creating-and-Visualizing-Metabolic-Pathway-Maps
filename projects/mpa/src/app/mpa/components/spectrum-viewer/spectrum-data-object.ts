import { DataPoint } from './spectrum-viewer.component';
import { fragmentCalculator } from './fragmentCalculator';

export class SpectrumDataObject {

    private tolerance = 1

    public ySingle: DataPoint[] = [];
    public yDouble: DataPoint[] = [];
    //public y0: DataPoint[] = [];
    //public yStar: DataPoint[] = [];
    public bSingle: DataPoint[] = [];
    public bDouble: DataPoint[] = [];
    //public b0: DataPoint[] = [];
    //public bStar: DataPoint[] = [];
    public rest: DataPoint[] = [];

    spectrumString: string = "";
    peptideSequence: string = "";
    peakArray: DataPoint[] = [];

    constructor(peakArray: [],peptideSequence: string,spectrumString?: string){
        this.peakArray = this.convertArrayToDataPoints(peakArray);
        this.peptideSequence = peptideSequence;
        this.spectrumString = spectrumString;

        if(peakArray.length>0 && peptideSequence.length>0){    //make sure the object only gets fully initialised if there is actually any data passed in
        this.initialize()
        }

        //TODO: Erro handling?
    }
    convertArrayToDataPoints(peakArray: []) {
        var dataPoints: DataPoint[] = [];
        peakArray.map(peak => {
            let dataPoint: DataPoint = {x: peak[0], y: peak[1]};
            dataPoints.push(dataPoint);
        })
        return dataPoints;
    }

    initialize(){
        //copy both inputs so they can be safely modified
       let localDataArray = [...this.peakArray]
       const localPeptideSequence = this.peptideSequence

       //get all possible theoretical Ion Fragments
       let ionFragments: number[] = new fragmentCalculator().calculateFragmentIons(localPeptideSequence)

       //compare DataPoints from originalArray with theoretical ion fragments -> get different ion types
       let i = 0
       while(i < localDataArray.length){
           let j = 0
           while(j < ionFragments.length){
               for(let a = 0; a < 4; a++){          //loop through the b+, b++, y+ and y++ ions -> 4 ions for each AA
                if( (ionFragments[j+a] - this.tolerance) <  localDataArray[i].x && (ionFragments[j+a] + this.tolerance) > localDataArray[i].x){
                    switch(a){
                        case 0:
                            this.bSingle.push(localDataArray[i])
                            break
                        case 1:
                            this.bDouble.push(localDataArray[i])
                            break
                        case 2:
                            this.ySingle.push(localDataArray[i])
                            break
                        case 3:
                            this.yDouble.push(localDataArray[i])
                            break
                    }
                    break
                }
               }
               j+=4
           }
           i++
       }
       // handle unfound rest
       for(let k = 0;k < localDataArray.length; k++){
           if(this.ySingle.indexOf(localDataArray[k]) == -1 && this.yDouble.indexOf(localDataArray[k]) == -1 && this.bSingle.indexOf(localDataArray[k]) == -1 && this.bDouble.indexOf(localDataArray[k]) == -1){
            this.rest.push(localDataArray[k])
           }
       }
    }
}
