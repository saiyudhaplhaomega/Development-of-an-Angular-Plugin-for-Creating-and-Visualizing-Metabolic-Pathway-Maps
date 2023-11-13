import { Component, OnInit,  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-power-input',
  templateUrl: './power-input.component.html',
  styleUrls: ['./power-input.component.css']
})
export class PowerInputComponent implements OnInit {
    searchTaxonCtrl = new FormControl();
    filteredTaxa: any;
    isLoading = false;
    errorMsg: string;

    private url = 'https://tax2proteome.de/api/query.php?q=';
    // private url =  "http:///localhost:8000/tax2proteome/rest_tax2proteome/query.php?q="
    @Output() messageEvent = new EventEmitter<string>();

    constructor(
        private http: HttpClient,
    ) {
    }

    ngOnInit() {
        this.searchTaxonCtrl.valueChanges
            .pipe(
                debounceTime(500),
                tap(() => {
                    this.errorMsg = '';
                    this.filteredTaxa = [];
                    this.isLoading = true;
                }),
                switchMap(value => this.http.get( this.url + value + '&limit=5')
                    .pipe(
                        finalize(() => {
                            this.isLoading = false
                        }),
                    )
                )
            )
            .subscribe(data => {
                this.errorMsg = '';
                this.filteredTaxa = data;
            });
    }

    displayName(taxon: { taxid: number, name: string }): string {
        return taxon && taxon.name ? taxon.name : '';
    }

    sendTaxEntry(selectedTaxon) {
        this.searchTaxonCtrl.setValue('');
        this.messageEvent.emit(selectedTaxon);
    }
}
