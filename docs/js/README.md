# JavaScript

## State management

This boilerplate manages application state using Redux-toolkit, makes it

For routing, we use [`react-router` in combination with `connected-react-router`](routing.md).

We include a generator for components, containers, sagas, routes and selectors.
Run `npm run generate` to choose from the available generators, and automatically
add new parts of your application!

> Note: If you want to skip the generator selection process,
> `npm run generate <generator>` also works. (e.g. `npm run generate container`)

### Learn more

- [Redux](redux.md)
- [react-intl](i18n.md)
- [routing](routing.md)
- [Asynchronously loaded components](async-components.md)

## Architecture: `components` and `containers`

We adopted a split between stateless, reusable components called (wait for it...)
`components` and stateful parent components called `containers`.

### Learn more

See [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
by Dan Abramov for a great introduction to this approach.
