import { Subject } from 'rxjs';

enum Event {
  SELECTION_CHANGE = 'selectionChange',
  CLEAR = 'clear',
}

export class CustomSelectionModel {
  selection = new Set<string>();
  selectionChangeSubject = new Subject<Event>();

  selectionBlocked = false;

  constructor(initialSelection: string[] = []) {
    initialSelection.forEach((id) => this.selection.add(id));
  }

  hasValue() {
    return this.selection.size > 0;
  }

  isSelected(id: string) {
    return this.selection.has(id);
  }

  select(ids: string[]) {
    if (this.selectionBlocked) {
      console.log('selection blocked');
      return;
    }
    this.selectionChangeSubject.next(Event.SELECTION_CHANGE);
    ids.forEach((id) => this.selection.add(id));
  }

  toggle(id: string) {
    if (this.selectionBlocked) {
      console.log('selection blocked');
      return;
    }
    this.selectionChangeSubject.next(Event.SELECTION_CHANGE);
    this.isSelected(id) ? this.selection.delete(id) : this.selection.add(id);
  }

  clear() {
    if (this.selectionBlocked) {
      console.log('selection blocked');
      return;
    }
    this.selectionChangeSubject.next(Event.CLEAR);
    this.selection.clear();
  }

  setSelectionBlocked(blocked: boolean) {
    this.selectionBlocked = blocked;
  }
}
