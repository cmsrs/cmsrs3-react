import React from 'react';
import { mount } from 'enzyme';
import Page from '../Page';
import Root from '../../../Root';
import { create } from "react-test-renderer";

import {initialStateMenuPages} from '../FixtureTest';

//initialStateMenuPages.pages.page.menu_id = 1
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

  const comment =  wrapped.find("input[name='comment']").prop('checked');
  expect(comment).toEqual(page.comment);

  //const published2 =  wrapped.find("input[name='published']").prop('checked');
  //expect(published2).toEqual(page.published);


  const type =  wrapped.find("select[name='type']").prop('value');
  expect(type).toEqual(page.type);

  const typeLenght = wrapped.find("select[name='type']").find('option').length;
  expect(typeLenght).toEqual(3);

  //const content =  wrapped.find("textarea").first().prop('value');
  //expect(content).toEqual(page.content);

  const menu_id =  wrapped.find("select[name='menu_id']").prop('value');
  expect(!menu_id).toEqual(true);

  //const menuIdLength =  wrapped.find("select[name='menu_id']").render().html();
  const menuIdLength =  wrapped.find("select[name='menu_id']").find('option').length;
  expect(menuIdLength).toEqual(3);
});

it('submit form', () => {
  //wrapped.find(".add-page-btn").simulate('click');
  //wrapped.find('[type="submit"]').simulate('click');
  wrapped.update();

  const form = wrapped.find('form').first();
  form.simulate('submit', {
    preventDefault: () => {
    },
    // below I am trying to set the value of the name field
    target: [
      {
        id: 1,
        title: 'title 1',
        short_title: 't1',
        published: 1,
        type: 'cms',
        menu_id: 1
      }
    ],
  });
  wrapped.update();


});
