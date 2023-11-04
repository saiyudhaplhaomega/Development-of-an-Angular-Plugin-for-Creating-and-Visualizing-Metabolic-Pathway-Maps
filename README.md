# AngularPSM

## Init Repo

Make sure to have npm installed on your system. Then run:

```bash
npm i
```

## Run Storybook:

1. Install the shared Library

  ```bash
  ng build shared-lib
  ```
2. Run Storybook 

  ```bash
  ng run metadata-tool:storybook 
  ```


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3 and updated to somewhere around 7.

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

