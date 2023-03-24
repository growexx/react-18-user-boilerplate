<img src="https://raw.githubusercontent.com/react-boilerplate/react-boilerplate-brand/master/assets/banner-metal-optimized.jpg" alt="react boilerplate banner" align="center" />

<br />

<div align="center"><strong>Start your next react project in seconds</strong></div>
<div align="center">A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices</div>

<br />

## Features

<dl>
  <dt>Quick scaffolding</dt>
  <dd>Create components, containers, routes, selectors and sagas - and their tests - right from the CLI!</dd>

  <dt>Instant feedback</dt>
  <dd>Enjoy the best DX (Developer eXperience) and code your app at the speed of thought! Your saved changes to the CSS and JS are reflected instantaneously without refreshing the page. Preserve application state even when you update something in the underlying code!</dd>

  <dt>Predictable state management</dt>
  <dd>Unidirectional data flow allows for change logging and time travel debugging.</dd>

  <dt>Next generation JavaScript</dt>
  <dd>Use template strings, object destructuring, arrow functions, JSX syntax and more.</dd>

  <dt>Next generation CSS</dt>
  <dd>Write composable CSS that's co-located with your components for complete modularity. Unique generated class names keep the specificity low while eliminating style clashes. Ship only the styles that are on the page for the best performance.</dd>

  <dt>Industry-standard routing</dt>
  <dd>It's natural to want to add pages (e.g. `/about`) to your application, and routing makes this possible.</dd>

  <dt>Industry-standard i18n internationalization support</dt>
  <dd>Scalable apps need to support multiple languages, easily add and support multiple languages with `react-intl`.</dd>

  <dt>Offline-first</dt>
  <dd>The next frontier in performant web apps: availability without a network connection from the instant your users load the app.</dd>

  <dt>Static code analysis</dt>
  <dd>Focus on writing new features without worrying about formatting or code quality. With the right editor setup, your code will automatically be formatted and linted as you work.</dd>

  <dt>SEO</dt>
  <dd>We support SEO (document head tags management) for search engines that support indexing of JavaScript content. (eg. Google)</dd>

  <dt>Storybook Support</dt>
  <dd>Get storybook setup out of the box in the boilerplate. Learn more about storybook <a href="https://storybook.js.org/">here</a>.

For easy use and development of stories in our boilerplate, follow these [instructions](docs/general/storybook.md).

  </dd>
  <dt>Access Control</dt>
  <dd>Boilerplate supports access control of features out of the box.
  
  More about access control can be found [here](docs/general/roleMiddleware.md).
  </dd>
  <dt>Redux-Form Support</dt>
  <dd>Boilerplate supports Redux-Form. It has demo and setup added out of the box for Redux-Form.

More about Redux-Form can be found [here](docs/third-party-integrations/redux-form.md).

  </dd>
  <dt>Google Analytics</dt>
  <dd>Google Analytics support is given in the boilerplate. This feature is optional and is based on requirement, so not merged in main branch.
  <br/>
  Support for Google Analytics can be found in <b>feature/18-Analytics-Tools</b> branch.

More about google analytics can be found [here](docs/general/googleAnalytics.md).

  </dd>
  <dt>Hooks Support</dt>
  <dd>Boilerplate supports hooks and all current components are converted to hooks. This feature is optional and is based on requirement, so not merged in main branch.
  <br/>
  Support for Hooks can be found in <b>feature/12-Hooks-Support</b> branch.
  </dd>
  <dt>Graphql Support</dt>
  <dd>Boilerplate supports graphql. It has demo and setup added out of the box for graphql. This feature is optional and is based on requirement, so not merged in main branch.
  <br/>
  Support for graphql can be found in <b>feature/11-GraphQL-Support</b> branch.

More about graphql setup can be found [here](docs/general/graphql.md).

  </dd>
  <dt>React-Final-Form Support</dt>
  <dd>Boilerplate supports React-Final-Form. It has demo and setup added out of the box for React-Final-Form. This feature is optional and is based on requirement, so not merged in main branch.
  <br/>
  Support for React-Final-Form can be found in <b>feature/React-Final-Form</b> branch.
  </dd>
  <dt>Social Login with firebase</dt>
  <dd>Boilerplate supports social login using firebase. It has demo and setup added out of the box for firebase and it's authentication functions. This feature is optional and is based on requirement, so not merged in main branch.
  <br/>
  Support for firebase authentication can be found in <b>feature/social-login</b> branch.

More about firebase setup can be found [here](docs/general/firebase.md).

  </dd>
  <dt>Two Factor Authentication</dt>
  <dd>Boilerplate supports two factor authentication. It has demo and setup added out of the box for two factor authentication.
  
  More about two factor authentication setup can be found [here](docs/general/twoFactorAuthentication.md).
  </dd>
  
<dt>Ecommerce Cart Functionality</dt>
  <dd>You can add and delete the product in the cart and also consistency is managed between the tabs using local storage. 
  
  More about Ecommerce Cart Functionality setup can be found [here](docs/general/ecommerceCartFunctionality.md).
  </dd>
  <dt>Real Time Chat</dt>
  <dd> Real time chat is feature of chatting and sending messages real time with the use of firebase.
  
  Support for firebase authentication can be found in <b>feature/RB-66-Real-Time-Chat</b> branch.

More about Real Time Chat setup can be found [here](docs/general/realTimeChat.md).

  </dd>
  <dt>Firebase Cloud Messaging</dt>
  <dd> Firebase cloud messaging allows us to send real time push notifications to the client.
  <br />
  Example can be found in 
  <b>feature/RB-85-Push-Notifications-FCM</b> branch.
    <br />

More about Firebase cloud messaging setup can be found [here](docs/general/firebaseCloudMessaging.md).

  </dd>
  <dt>Notifications with socket.io</dt>
  <dd> Boilerplate supports  Real time notifications with socket.io.
    <br /> 
  Example can be found in <b>feature/RB-87-Notifications-socket.io</b> branch.
  </dd>
</dl>

But wait... there's more!

- _The best test setup:_ Automatically guarantee code quality and non-breaking
  changes. (Seen a react app with 100% test coverage before?)
- _Native web app:_ Your app's new home? The home screen of your users' phones.
- _The fastest fonts:_ Say goodbye to vacant text.
- _Stay fast_: Profile your app's performance from the comfort of your command
  line!
- _Catch problems:_ AppVeyor and TravisCI setups included by default, so your
  tests get run automatically on Windows and Unix.

There’s also a <a href="https://vimeo.com/168648012">fantastic video</a> on how to structure your React.js apps with scalability in mind. It provides rationale for the majority of boilerplate's design decisions.

<sub><i>Keywords: React.js, Redux, Hot Reloading, ESNext, Babel, react-router, Offline First, ServiceWorker, `styled-components`, redux-saga, FontFaceObserver, storybook</i></sub>

## Quick start

1.  Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2.  Clone this repo using `git clone https://github.com/growexx/react-user-boilerplate.git`
3.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.<br />
4.  Run `npm run setup` in order to install dependencies and clean the git repo.<br />
    _At this point you can run `npm start` to see the example app at `http://localhost:3000`._
5.  Run `npm run clean` to delete the example app.
6.  Add env file into the project's main directory. Values for env file can be found [here](docs/general/env.md).

Now you're ready to rumble!

## Documentation

- [**Features**](docs/general/features.md): Detail list of features available in the boilerplate.
- [**The Hitchhiker's Guide to `react-boilerplate`**](docs/general/introduction.md): An introduction for newcomers to this boilerplate.
- [**Overview**](docs/general): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [**Testing**](docs/testing): How to work with the built-in test harness
- [**Styling**](docs/css): How to work with the CSS tooling
- [**Packages**](docs/general/packages.md): Open Source Packages used in the project.
- [**Your app**](docs/js): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.
- [**Troubleshooting**](docs/general/gotchas.md): Solutions to common problems faced by developers.

## License

This project is licensed under the MIT license, Copyright (c) 2019 Maximilian
Stoiber. For more information see `LICENSE.md`.

## Commit Tools Setup

For commit, we use [commitizen](https://github.com/commitizen/cz-cli) so the commit messages are in the same format for all the developers. This formatted messages are used in to create change logs.

1. Install Globally Commitizen `npm install -g commitizen`
2. Install Adapter `npm install -g cz-conventional-changelog`
3. Set as default adapter for your projects `echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc`
4. Usage: now instead of using `git commit` use `git cz`
5. If you want to use commit messages with emojis you can use following package
6. Install Adapter `npm install --global cz-emoji`
7. Set as default adapter for your projects `echo '{ "path": "cz-emoji" }' > ~/.czrc`
8. Usage `git cz`
