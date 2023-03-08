export interface DataItem {

  id: number;
  parent: number;
  children: DataItem[];
  depth: number;
  type: string;

  icon: string;
  displayName: string;
  expanded: boolean;
  creationDate: string;
  uuid: string;
  description: string;

}
