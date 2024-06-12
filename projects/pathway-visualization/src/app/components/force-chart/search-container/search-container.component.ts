import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="search-container">
      <div class="input-button-container">
        <input class="search-input" [(ngModel)]="searchText" (input)="onSearchTextChanged($any($event).target.value)" [placeholder]="searchPlaceholder">
        <button class="search-button" (click)="onSearch()">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <ul class="suggestions-list" *ngIf="suggestions.length">
        <li *ngFor="let suggestion of suggestions" (click)="onSuggestionClick(suggestion)">
          {{ suggestion }}
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['force-chart.component.css']
})
export class SearchBarComponent {
  @Input() searchText: string = '';
  @Input() searchPlaceholder: string = 'Search by ID';
  @Input() suggestions: string[] = [];
  @Output() searchTextChangedEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<void>();
  @Output() suggestionClickEvent = new EventEmitter<string>();

  onSearchTextChanged(text: string) {
    this.searchTextChangedEvent.emit(text);
  }

  onSuggestionClick(suggestion: string) {
    this.suggestionClickEvent.emit(suggestion);
  }

  onSearch() {
    this.searchEvent.emit();
  }
}
