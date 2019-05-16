import React from 'react';
import { mount } from 'enzyme';
import MenuPages from '../MenuPages';
import Root from '../../../Root';
import { create } from "react-test-renderer";

import {initialStateMenuPages} from '../FixtureTest';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root initialState={initialStateMenuPages} >
      <MenuPages  />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

//describe('MenuPages', () => {
it('test number of menus', () => {
  const input = wrapped.find("input[name='name']");
  expect(input.length).toEqual(3);
});

it('add menu', () => {
  wrapped.find("#add_menu").simulate('click');
  wrapped.update();
  const inputName = wrapped.find("input[name='name']");
  expect(inputName.length).toEqual(4);
});
//});
