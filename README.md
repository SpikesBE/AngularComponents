## Spikes Angular Components 

We have been working with Angular for a while now and in doing so developed the need to reuse components accross projects.

This repository will hold the source code of some components as well as a demo project to showcase those components. 

### Dependencies
* [Angular](https://angular.io) (tested with 4.2.6)
* [Bootstrap 4](https://v4-alpha.getbootstrap.com) (tested with 4.0.0-alpha.6)
* [ng-bootstrap](https://ng-bootstrap.github.io) (tested with 1.0.0-beta.5)

### Installation
After installing the dependencies, install `spikes-ng2-components`via:
```shell
npm install spikes-ng2-components [--save]
```

Once installed you need to import the module in your AppModule:
```js
import { SpikesNg2ComponentsModule } from 'spikes-ng2-components';

@NgModule({
  declarations: [
    ...
  ],
  imports: [    
    ...,
    SpikesNg2ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Angular-CLI
If you are using the angular-cli to build your app, don't forget to add the styles and scripts to the .angular-cli.json file.

```json
{
  ...
  "apps": [
    {
      ...
      "styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.css",
        "../node_modules/font-awesome/css/font-awesome.css",
        "styles.css"
      ],
      "scripts": [
      ],
      ...
    }
  ],
  ...
}
```

### Documentation
Further documentation can be found [here](https://spikesbe.github.io/AngularComponents/)