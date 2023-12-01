import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MetadataLandingPageComponent } from "./pages/metadata-landing-page/metadata-landing-page.component";

const routes: Routes = [
  {
    path: "home",
    component: MetadataLandingPageComponent
  },
  {
    path: "upload",
    loadChildren: () =>
      import("./components/upload-container/metadata-uploadpage.module").then(
        (m) => m.MetadataUploadContainerModule
      )
  },
  {
    path: "workflow",
    loadChildren: () =>
      import("./pages/metadata-workflow-page/Page/metadata-workflow-page.module").then(
        (m) => m.MetadataWorkflowPageModule
      )
  },
  {
    path: "sdrf",
    loadChildren: () =>
      import("./pages/metadata-workflow-page/metadata-workflow.module").then(
        (m) => m.WorkflowModule
      )
  },
  {
    path: "download",
    loadChildren: () =>
      import(
        "./pages/metadata-download-page/metadata-downloadpage.module"
      ).then((m) => m.MetadataDownloadpageModule)
  },

  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
