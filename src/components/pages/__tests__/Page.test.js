import React from 'react';
import { mount } from 'enzyme';
import Page from '../Page';
import Root from '../../../Root';
import { create } from "react-test-renderer";

import {initialStateMenuPages} from '../FixtureTest';

const page = initialStateMenuPages.pages.page;
let wrapped;

//const menuItem = initialStateMenuPages.page;
//console.log(menuItem);

beforeEach(() => {
  wrapped = mount(
    <Root initialState={initialStateMenuPages} >
      <Page />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});


it('page render', () => {

  const title =  wrapped.find("input[name='title']").prop('value');
  expect(title).toEqual(page.title);

  const shortTitle =  wrapped.find("input[name='short_title']").prop('value');
  expect(shortTitle).toEqual(page.short_title);

  const published =  wrapped.find("input[name='published']").prop('checked');
  expect(published).toEqual(page.published);

  const type =  wrapped.find("select[name='type']").prop('value');
  expect(type).toEqual(page.type);

  const typeLenght = wrapped.find("select[name='type']").find('option').length;
  expect(typeLenght).toEqual(2);

  const menu_id =  wrapped.find("select[name='menu_id']").prop('value');
  expect(!menu_id).toEqual(true);

  //const menuIdLength =  wrapped.find("select[name='menu_id']").render().html();
  const menuIdLength =  wrapped.find("select[name='menu_id']").find('option').length;
  expect(menuIdLength).toEqual(3);
});
