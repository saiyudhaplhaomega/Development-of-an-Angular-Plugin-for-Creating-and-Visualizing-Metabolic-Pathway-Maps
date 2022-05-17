export class fragmentCalculator {
    
    PROTON: number = 1.007276

    constructor(){
    }
    
    calculateFragmentIons(peptideSequence: String){
        let fragmentIons = new Array<number>(peptideSequence.length * 4)

        let a: number = 0
        let lCount: number = 0

        // DEAL WITH PROTEIN N-TERMINUS
        // dValue = 0.0;
        // deal with non-hydrolytic cleavage
        let bValue = 0
        let yValue = 18.010560035000001

        //main loop
        while (a <= peptideSequence.length - 1){
            bValue += this.getAAMass(peptideSequence.charAt(a))
            yValue += this.getAAMass(peptideSequence.charAt(peptideSequence.length - 1 - a))
            fragmentIons[lCount] = this.PROTON + bValue
            lCount++
            fragmentIons[lCount] = (this.PROTON * 2 + bValue) / 2
            lCount++
            fragmentIons[lCount] = this.PROTON + yValue
            lCount++
            fragmentIons[lCount] = (this.PROTON * 2 + yValue) / 2
            lCount++

            a++
        }
        return fragmentIons
    }

    getAAMass(character: String){
        switch(character) {
            case 'A':
                return 71.03712
            case 'B': 
                return 114.1038
            case 'C':
                return 103.00919
            case 'c':
                return 160.03065
            case 'D':
                return 115.02695
            case 'E':
                return 129.0426
            case 'F':
                return 147.06842
            case 'G':
                return 57.02147
            case 'H':
                return 137.05891
            case 'I':
                return 113.08407
            case 'J':
                return 113.08407
            case 'K':
                return 128.09497
            case 'L':
                return 113.08407
            case 'M':
                return 131.04049
            case 'N':
                return 114.04293
            case 'O':
                return 237.31 // pyrolysine
            case 'P':
                return 97.05277
            case 'Q':
                return 128.05858
            case 'R':
                return 156.10112
            case 'S':
                return 87.03203
            case 'T':
                return 101.04768
            case 'U':
                return 150.0328 // selenocysteine
            case 'V':
                return 99.06842
            case 'W':
                return 186.07932
            case 'X':
                return 0.0 // X is interpreted as an internal cleavage site/stop codon. It is the
                            // equivalent of "*".
            case 'Y':
                return 163.06333
            case 'Z':
                return 128.1307
        }
        return 0
    }
}