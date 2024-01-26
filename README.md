# AngularPSM

## Folder structure

### Concept

The application structure should follow the "LIFT" concept:

- locate quickly (i.e., descriptive folder structure)
- identifiability (i.e., meaningful naming)
- flat structure (i.e., no nested folders if possible)
- try to be DRY (Don't Repeat Yourself, i.e., try to reuse code)

### Implementation

An Angular workspace contains files of one or more applications. Importantly, it contains configuration files relevant for all applications, e.g., "package.json" to specify packages and their versions, and a "master-stylesheet.scss" containing application wide style configurations.

![workspace](styleguide/workspace.PNG)

The projects folder contains applications and libraries. The "template-project" contains an example structure for applications.

![template-project](styleguide/template-project.PNG)

For an explanation of "material-style-overrides" see below.

Modules are the entrypoints for Angular to build the application or parts of it ([source](https://angular.io/guide/architecture-modules)). The highest module is "app.module.ts".

This is the location of the top-level component (no other components exist at this level). Locate services and models (i.e., interfaces, enums) relevant for the complete application in the respective folders.

"modules" contains feature submodules, i.e., isolated functional parts of the application. Modules are lazily loaded by the router on the app level.

![app-module-level](styleguide/app-folders.PNG)

In analogy, a submodule (i.e., located in "app/modules") follows the same structure of the app level. Every submodule needs one routing module to be laziliy-loaded. A submodule has a "module parent" component that renders all components belonging to that module. Components, services, and models relevant for that submodule are located in respective folders. Further "subsubmodules" are also possible ("modules" folder).

![sub-module-level](styleguide/module.PNG)

Components may have multiple child-components located in respective folders.

![component](styleguide/component.PNG)

## Pretier and ESLint setup

1. In vS Code install the eslit-prettier plugin.
2. Set `"editor.formatOnSave": true` in the config

## Generate module page with routing

Example of creating an module called `metadata-quest-page` inside the `metadata-tool` project. The route quest leads to the component and is lazy loaded in the app-rounting component.

```sh
ng g m metadata-quest-page --project metadata-tool --route quest --module app-routing
```

## Run storybook

Make shure you have the the shared Library installed.

```sh
ng build shared-lib
```

**Note:** You have to `cd` inside the root folder `mpa-website` to run storybook!

```sh
ng run metadata-tool:storybook
```

## Init Repo

1. Update Node

Make sure to have npm installed on your system. Then run:

```sh
npm i
```

## Setup Backend

### Install docker container

```sh
sudo docker run -it  -d -p 9500:9500 --name metadatatool mpacloud/metadatatool-test
```

### Update Image

```sh
sudo docker pull mpacloud/metadatatool-test:latest
```

### Run docker container autmatically, when workspaces starts in VS Code

1. install the `Docker Run` extention for VS Code
2. `cmd  + shift + p` to open command palette
3. `Docker Run: Add Container`
4. Select metadatatool

Now, every time the same workspace gets opend with vs code, the docker container should start running.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Overriding Angular Material Styles

If you want to style material components different from the default, please check first:

1. Can I use the API of the Angular material component (i.e., directives, property binding)?

2. Can I style the component via its selector (e.g. mat-stepper) or can I use a container (e.g. span for text, div for layout)?

THEN you need to override internal styles of the material component.

3. What is the actual internal component styling making trouble? > Use the browser devtools to inspect the html and find the corresponding classname.

4. Put the classname into the "material-styles-overrides.scss" file and test whether you can change the styling from here.

5. Find the name of the uppermost parent element of the material component and its classname (e.g., "mat-stepper-vertical" for mat-stepper).

6. Compose parent and child classnames like so:

```
.parent-class {
   & .child-class {
     // your styling here
   }
```

Check that you introduce a space between "&" and .child-class!

7. Create an individual classname for the component you want to style. Try to follow this convention:
   `.<mat-component-name>-<target-component>`
   Apply the individual classname to the material component in the html template of your component.
   Attach the individual classname to the parent classname like so:
   `.parent-class.<individual-classname> {...}`

You can also change multiple internal stylings:

```
 .parent-class.<individual-classname> {
   & .child-class1 {...}
   & .child-class2 {...}
}
```

If you are confused how this works, check out these links:

- Ampersand: https://medium.com/the-crazy-coder/what-scss-means-e448e2ac98d3
- CSS Selectors: https://www.w3schools.com/cssref/css_selectors.php
- Material overriding: https://betterprogramming.pub/best-way-to-overwrite-angular-materials-styles-e38dc8b84962

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Deploying to DockerHub

`ng build --prod`
`docker build -t INSERT_NAME .`
`docker push INSER_NAME`

webstorm console:
ng build --prod

dist ordner kopieren nach "cygwin64\home\kaysc\mpa-cloud-docker"

in cygwin console:
scp -r -P 7000 -i cloud mpa-cloud-docker/ centos@129.70.51.126:/home/centos

auf BOOTSTRAP:
sudo docker build -t mpacloud/mpawebsite .
sudo docker push mpacloud/mpawebsite

container dann verfügbar auf dcos

Test-Server Access:
ssh -i cloud -L 80:129.70.51.126:10001 public

<!-- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3 and updated to somewhere around 7. -->

# Documentations with compodoc

## Installation

Install compodoc ([source](https://compodoc.app/guides/installation.html)).

## Code documentation

If you have a license, use GitHub copilot to accelerate writing the documentation.

Use JS docstrings:

```
/**
*  Documentaion here
*/
```

Use tags to declare parameters, return values, deprecation, or other ([source](https://compodoc.app/guides/jsdoc-tags.html)):

```
/**
* @param
* @returns
* @deprecated
*/
```

Specify parameter or return types:

```
  /**
   * Method to get resource URLs.
   *
   * @param {string[]} resources - The resources for which URLs are to be generated.
   * @returns {string[]} The generated URLs for the resources.
   */
  getResourceUrls(resources: string[]) {
    const urls = [];
    for (let resource of resources) {
      urls.push(
        'http://localhost:8080/' + this.ofsData.job.jobId + '/' + resource
      );
    }
    return urls;
  }
  ...
```

Document components, services, or directives by adding the docstring before the decorator:

```
...
import { StepperService } from './services/stepper.service';

/**
 * Parent component for the workflow stepper. Uses workflow service to track, send,
 *  and request data. Uses the stepper service to manage the stepper.
 */
@Component({
  selector: 'ofs-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit {
   ...
```

Document classes, parameters, methods, interface, etc. by putting a docstring in front of the corresponding declaration:

```
/**
 * Model for features
 */

export interface Feature {
  /**
  * Id of the feature
  */
  featureID: string;
}
```

## Build documentation

Add a 'tsconfig.doc.json' file in your workspace root containing "include" and "exclude" properties. Include all .ts files for your project root and exclude all test files for that project:

```
{
   "include": ["./projects/ofs/**/*.ts", "./projects/other-project/**/*.ts"],
   "exclude": ["./projects/ofs/**/*.spec.ts", "./projects/other-project/**/*.spec.ts"]
}
```

Open a terminal, navigate to workspace root and execute `npx compodoc -p tsconfig.doc.json` or register a script in your package.json and run it. The documentation files are rendered into the "documentation" directory in the workspace root. Open "overview.html" in your browser to view the documentation. For mdoa-websites, "documentation" is on .gitignore.
