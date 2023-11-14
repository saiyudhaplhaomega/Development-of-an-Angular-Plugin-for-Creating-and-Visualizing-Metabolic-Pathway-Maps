# AngularPSM

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

Make sure to have npm installed on your system. Then run:

```sh
npm i
```

If some error occures like:

```sh
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
...
```

Run with `--legacy-peer-deps` based on [link](https://stackoverflow.com/questions/64573177/unable-to-resolve-dependency-tree-error-when-installing-npm-packages)

```sh
npm install --legacy-peer-deps
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

1) Can I use the API of the Angular material component (i.e., directives, property binding)?

2) Can I style the component via its selector (e.g. mat-stepper) or can I use a container (e.g. span for text, div for layout)?

THEN you need to override internal styles of the material component.

3) What is the actual internal component styling making trouble? > Use the browser devtools to inspect the html and find the corresponding classname.

4) Put the classname into the "material-styles-overrides.scss" file and test whether you can change the styling from here.

5) Find the name of the uppermost parent element of the material component and its classname (e.g., "mat-stepper-vertical" for mat-stepper).

6) Compose parent and child classnames like so:
```
.parent-class {
   & .child-class {
     // your styling here
   }
```
 
Check that you introduce a space between "&" and .child-class!

7) Create an individual classname for the component you want to style. Try to follow this convention:
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
