import { on, action } from "@glimmerx/modifier";
import logo from "./assets/glimmer-logo.png";
import Component, { hbs, tracked } from "@glimmerx/component";

import HelloWorld from "./components/HelloWorld.hbs";

import LazyComponentWrapper from "./components/LazyComponent";
import { getSearchValues, setSearchValue } from "./utils/search-params";

const Heading = hbs`<h1>Hello {{@bundlerName}}!</h1>`;

const DocumentationLink = hbs`<a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>`;

export default class App extends Component {
  @tracked _bundlerName = getSearchValues().bundler ?? "vite";
  get bundlerName() {
    return this._bundlerName;
  }
  set bundlerName(value) {
    setSearchValue("bundler", value);
    this._bundlerName = value;
  }
  @tracked Icon = new LazyComponentWrapper(
    () => import("./components/LazyIcon.hbs")
  );
  @tracked UserList = new LazyComponentWrapper(
    () => import("./components/UserList.hbs")
  );
  assets = { logo };
  static template = hbs`
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <button></button>
        <HelloWorld />
        <Heading @bundlerName={{this.bundlerName}} />
        <DocumentationLink />
      
        {{#if this.Icon.isLoaded}}

          <this.Icon.Component @a=32 @n=true />
          <@FormComponent />

        {{else if this.Icon.isLoading}}
          Loading...
        {{else if this.Icon.isError}}
          Loading error..
        {{/if}}

        {{#if this.UserList.isLoaded}}
          <this.UserList.Component @logo={{this.assets.logo}} @title={{this.bundlerName}} />
        {{/if}}

      </div>
    </section>
    `;
  @action updateValue(event: { target: HTMLInputElement }) {
    this.bundlerName = event.target.value;
    if (this.bundlerName === "icon") {
      this.Icon.loadComponent();
    } else if (this.bundlerName === "-icon") {
      this.Icon.unloadComponent();
    } else if (this.bundlerName === "user") {
      this.UserList.loadComponent();
    } else if (this.bundlerName === "-user") {
      this.UserList.unloadComponent();
    }
  }
}
