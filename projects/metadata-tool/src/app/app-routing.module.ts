import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MetadataLandingPageComponent } from "./pages/metadata-landing-page/metadata-landing-page.component";
import { LoginPageComponent } from "shared-lib";

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
  // {
  //   path: "sdrf",
  //   loadChildren: () =>
  //     import("./pages/metadata-workflow-page/metadata-workflow.module").then(
  //       (m) => m.WorkflowModule
  //     )
  // },
  { path: 'about',
  loadChildren: () =>
  import('./pages/about-metadatatool/metadatatool-about/metadatatool-about.module').then(
    (m) => m.AboutMetadatatoolModule
  ),
},

{ path: 'tutorial',
loadChildren: () =>
import('./pages/about-metadatatool/metadatatool-tutorial/metadatatool-tutorial.module').then(
  (m) => m.MetadatatoolTutorialModule
),
},

  {path: "login", component: LoginPageComponent},

  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
