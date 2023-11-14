
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataQuestPageComponent } from './metadata-quest-page.component';

const routes: Routes = [
    { path: 'metadata-quest', component: MetadataQuestPageComponent },
    // ... other routes
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MetadataQuestPageModule { }

