/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'memo',
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: 'wantApiSliceFile',
      default: true,
      message: 'Do you want to create the apiSlice file for the component',
    },
    {
      type: 'confirm',
      name: 'wantSliceFile',
      default: false,
      message: 'Do you want to create the slice file for the component',
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
    {
      type: 'confirm',
      name: 'wantStorybookFile',
      default: false,
      message: 'Do you want to create the storybook file for the component',
    },

  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/index.js',
        templateFile: './container/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/index.test.js',
        templateFile: './container/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/messages.js',
        templateFile: './container/messages.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantSliceFile) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/slice.js',
        templateFile: './container/slice.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantApiSliceFile) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/apiSlice.js',
        templateFile: './container/apiSlice.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }
    // If the user wants to create story file for the component
    if (data.wantStorybookFile) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/stories/{{properCase name}}.stories.js',
        templateFile: './component/storybook.js.hbs',
        abortOnFail: true,
      });
    }
    actions.push({
      type: 'prettify',
      path: '/containers/',
    });

    return actions;
  },
};
