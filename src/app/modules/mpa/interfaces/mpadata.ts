import { Type } from '@angular/core';

export interface MPAData {
    component: Type<any>;
    name: string;
    icon: string;
    uuid: string;
    children: number[];
}
