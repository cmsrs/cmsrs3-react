import React from 'react';
import { mount } from 'enzyme';
import Menu from '../Menu';
import Root from '../../../Root';
import { create } from "react-test-renderer";

// import { SERVER_URL } from '../../../config';
// import axios from 'axios';
// import moxios from 'moxios';

import {initialStateMenuPages} from '../FixtureTest';

let wrapped;

const menuItem = initialStateMenuPages.pages.menus[0];
//console.log(menuItem);

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
  const text = wrapped.render().html();
  //console.log(text);
});

it('count pageTitle', () => {
  const editPageLength = wrapped.find(".fa-edit").length;
  expect(editPageLength).toEqual(2);
});

it('count pageTitle for second menu', () => {
  const menuItem2 = initialStateMenuPages.pages.menus[1];
  let wrapped2 = mount(
    <Root initialState={initialStateMenuPages} >
      <Menu  key={menuItem2.id} data={menuItem2}  />
    </Root>
  );


  const editPageLength = wrapped2.find(".fa-edit").length;
  expect(editPageLength).toEqual(1);

  wrapped2.unmount();
});



// it('menu delete', () => {
//   wrapped.find(".fa-trash").parent().props().onClick();
//   wrapped.update();
// });

// describe('ajax tests', () => {
//     let axiosInstance;
//     beforeEach(() => {
//       moxios.install();
//     });
//     afterEach(() => {
//       moxios.uninstall();
//     });
//     it('should axios a thing', (done) => {
//         localStorage.setItem('token', 'test333333');
//         wrapped.find(".fa-save").parent().props().onClick();
//
//         moxios.wait(function () {
//           //localStorage.setItem('token', 'test333333');
//           let request = moxios.requests.mostRecent()
//           request.respondWith({
//             status: 200,
//             response: {success: true}
//           })
//           .then(function () {
//             //const text = wrapped.render().html();
//             //console.log(text);
//             done()
//           })
//         })
//     });
// });
