import React from 'react';
import { mount } from 'enzyme';
import Menu from '../Menu';
import Root from '../../../Root';
import { create } from "react-test-renderer";

import {initialStateMenuPages} from '../FixtureTest';

let wrapped;

const menuItem = initialStateMenuPages.pages.menus[0];
//console.log(menuItem);


/*
function setup() {
  const props = {
    pages: jest.fn()
  }
  return {
    props
    //enzymeWrapper
  }
}
*/


beforeEach(() => {
  wrapped = mount(
    <Root initialState={initialStateMenuPages} >
      <Menu  key={menuItem.id} data={menuItem}  />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});


it('menu render', () => {
  //const html = wrapped.render().html();
  //console.log(html);
  const input = wrapped.find("input[name='name']");
  expect(input.length).toEqual(1);
});

it('menu change input', () => {
  const value = wrapped.find("input[name='name']").prop('value');
  expect(value).toEqual(menuItem.name);

  const newVal = "newVal";
  const event = {target: {name: "name", value: newVal}};
  wrapped.find("input[name='name']").simulate('change', event);
  wrapped.update();
  const value2 = wrapped.find("input[name='name']").prop('value');
  expect(newVal).toEqual(value2);
});

it('menu save', () => {
  wrapped.find(".fa-save").parent().props().onClick();
  wrapped.update();
});

it('menu delete', () => {
  //console.log( wrapped.render().html() );
  wrapped.find(".fa-trash").parent().props().onClick();
  //wrapped.find(".fa-trash").parent().simulate('click');
  wrapped.update();
  //console.log( wrapped.render().html() );
  //console.log( wrapped.render() );
  //const input = wrapped.find("input[name='name']");
  //expect(input.length).toEqual(0);
});

//fa-trash
