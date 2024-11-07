import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shortest-path-bar',
  templateUrl: `./shortest-path.component.html`,
  styleUrls: ['shortest-path.component.css']
})
export class ShortestPathComponent {
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
