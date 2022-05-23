import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import config from '@plone/volto/registry';

import Edit from './Edit';

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();
const blockId = '1234';

config.blocks.blocksConfig = {
  hero: {
    id: 'hero',
    title: 'Hero',
    group: 'media',
    extensions: {},
    variations: [],
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};

test('renders an edit hero block component', () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
      subrequests: {
        [blockId]: {},
      },
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Edit
        data={{ url: 'hero', '@type': 'hero' }}
        selected={false}
        block={blockId}
        content={{}}
        request={{
          loading: false,
          loaded: false,
        }}
        pathname="/news"
        onChangeBlock={() => {}}
        onSelectBlock={() => {}}
        onDeleteBlock={() => {}}
        createContent={() => {}}
        onFocusPreviousBlock={() => {}}
        onFocusNextBlock={() => {}}
        handleKeyDown={() => {}}
        index={1}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
