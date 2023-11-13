import { Component, OnInit } from '@angular/core';
import {UserInputService} from '../user-input.service';
import {NamesService} from '../names.service';

@Component({
    selector: 'app-create-options',
    templateUrl: './create-options.component.html',
    styleUrls: ['./create-options.component.css']
})
export class CreateOptionsComponent implements OnInit {

    constructor(
        public UserInService: UserInputService,
        private namesService: NamesService
    ) {
    }

    ngOnInit(): void {
    }

    // if rank is changed, keep selected taxIDs but show taxIDs for selected rank
    async find_taxids(event) {
        this.UserInService.rankedTaxa = [];
        if (event.isUserInput) {
            const rank = event.source.value;
            if (rank === 'species') {
                this.UserInService.shownTaxa = this.UserInService.selectedTaxa;
                this.UserInService.sendTaxa();
            } else {
                for (const taxon of this.UserInService.selectedTaxa) {
                    const taxiddata = await this.namesService.getIDs([taxon.taxid]);
                    let taxonNew = taxiddata[0];
                    // get parent ID until rank not 'no rank'
                    while (taxonNew.rank === 'no rank') {
                        const receiveData = await this.namesService.getIDs([taxonNew.parentid]);
                        taxonNew = receiveData[0];
                        if (taxonNew.taxid === 1){
                            taxonNew.rank = 'root';
                            console.log('Root reached');
                        }
                    }
                    // if rank > user selected rank: ranked taxa = user input taxa
                    if (this.UserInService.order.indexOf(taxonNew.rank) > this.UserInService.order.indexOf(rank)) {
                        this.UserInService.rankedTaxa.push(taxiddata[0]);
                    // if rank == selected rank, taxID = user input taxa
                    } else if (this.UserInService.order.indexOf(taxonNew.rank) === this.UserInService.order.indexOf(rank)) {
                        this.UserInService.rankedTaxa.push(taxonNew);
                    // if rank < selected rank find next taxid with specified level
                    } else {
                        let lastTaxonWithSpecifiedLevel = taxonNew;
                        while (this.UserInService.order.indexOf(taxonNew.rank) < this.UserInService.order.indexOf(rank)) {
                            if (taxonNew.taxid === 1){
                                taxonNew.rank = 'root';
                                console.log('Root reached');
                            }
                            else if (taxonNew.rank !== 'no rank') {
                                lastTaxonWithSpecifiedLevel = taxonNew;
                                const receiveData = await this.namesService.getIDs([taxonNew.parentid]);
                                taxonNew = receiveData[0];
                            }
                            else {
                                const receiveData = await this.namesService.getIDs([taxonNew.parentid]);
                                taxonNew = receiveData[0];
                            }
                        }
                        // new taxon has specified rank
                        if (this.UserInService.order.indexOf(taxonNew.rank) === this.UserInService.order.indexOf(rank)) {
                            this.UserInService.rankedTaxa.push(taxonNew);
                        }
                        // new taxon has rank > specified rank (or root), push last specified
                        if (this.UserInService.order.indexOf(taxonNew.rank) > this.UserInService.order.indexOf(rank)) {
                            this.UserInService.rankedTaxa.push(lastTaxonWithSpecifiedLevel);
                        }
                    }
                }
                this.UserInService.set_to_set();
                this.UserInService.shownTaxa = this.UserInService.rankedTaxa;
                this.UserInService.sendTaxa();
            }
        }
    }
}
