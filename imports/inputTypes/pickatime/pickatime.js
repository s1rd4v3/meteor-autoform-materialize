/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Blaze } from 'meteor/blaze';
import moment from 'moment';
import 'meteor/mozfet:materialize-time-picker';
import { currentTime } from 'meteor/mozfet:materialize-time-picker/imports/picker';
import './pickatime.html';

const TIME_FORMAT = 'h:mm A';

console.log('pickatime - add input type');

//add autoform input
AutoForm.addInputType('pickatime', {
  template: 'afInputPickatime_materialize',
  valueOut: function() {
    // console.log('pickatime: valueOut.this', this);
    return this.val();
  }
});

//when created
Template.afInputPickatime_materialize.onCreated(() => {
  const instance = Template.instance();
  console.log('pickatime.instance', instance);

  //if value was provided
  let value;
  if(instance.data.value) {

    //use provided value as value
    value = instance.data.value;
  }

  //else if initialising to current time - thus no value was provided
  else if (instance.data.atts.initToCurrentTime) {

    //use current time as value
    value = currentTime();
    console.log('currentTime', value);
    value = currentTime();
  }

  //initialise value
  instance.value = new ReactiveVar(value);
});

//when rendered
Template.afInputPickatime_materialize.onRendered(() => {
  const instance = Template.instance();

  //get label query
  const qInput = $('#'+instance.data.atts.id);
  const qParent = qInput.parent().parent().parent();
  const qLabel = qParent.find('label');

  //autorun when instance value change
  instance.autorun(() => {

    //if value is set
    if(instance.value.get()) {

      //add active class to label
      qLabel.addClass('active');
    }

    //else - no value
    else {

      //remove active class from label
      qLabel.removeClass('active');
    }

  });
});

//helpers
Template.afInputPickatime_materialize.helpers({
  attr() {
    const instance = Template.instance();
    const atts = instance.data.atts;
    const val = instance.value.get();
    return {
      'id'                : atts.id,
      'data-schema-key'   : atts['data-schema-key'],
      'class'             : 'js-timepicker-trigger',
      'type'              : 'text',
      'data-value'        : val,
      'value'             : val
    };
  },
  value() {
    const instance = Template.instance();
    return instance.value;
  },
  id() {
    const instance = Template.instance();
    return instance.id;
  }
});

//events
Template.afInputPickatime_materialize.events({
});
