/*global angular*/
(function withAngular(angular) {
  'use strict';

  angular.module('kalkiUtility', [])
  .service('kUtil', function kUtil() {

    var service=this;

    service.isObjPresent = function(obj) {
       var type = service.getObjType(obj);
       if (type === 'object') {
           for (var key in obj) {
               if (obj.hasOwnProperty(key)) {
                   return true;
               }
           }
           return false;
       } else if (type === 'array') {
           if (obj.length > 0) {
               return true;
           } else if (obj.length == 0) {
               return false;
           } else {
               throw new Error(obj + ' comes to array if-else but the length is neither 0 or more than 0');
           }
       } else if (type === 'string') {
           if (obj.length > 0) {
               return true;
           } else if (obj.length == 0) {
               return false;
           } else {
               throw new Error(obj + ' comes to string if-else but the length its not 0 or more than 0');
           }
       } else if (type === 'boolean') {
           if (obj === true) {
               return true
           } else if (obj === false) {
               return false;
           } else {
               throw new Error(obj + ' comes to boolean if-else but is neither true or false');
           }
       } else if (type === 'number') {
           return true; // We assume if the obj passed in is a number, that means it has a value and thus present (either negative or positive value)
       } else if (type === 'null') {
           return false;
       } else if (type === 'undefined') {
           return false;
       } else if (type === 'function') {
           var tmpStr = obj.toString();
           var tmpStr2 = tmpStr.substring(tmpStr.indexOf('{') + 1, tmpStr.indexOf('}')).trim().replace(/\r?\n|\r/g, ""); // The RegEx here is to check for: arriage Return (CR, \r, on older Macs), Line Feed (LF, \n, on Unices incl. Linux) or CR followed by LF (\r\n, on WinDOS)
           if (isObjPresent(tmpStr2)) {
               return true;
           } else {
               return false;
           }
       } else if (type === 'date') {
           if (isNaN(obj.getTime())) {
               return false; // Date is invalid
           } else {
               return true; // Date is valid
           }
       } else if (type === 'htmlDivElement') {
           if(type.toString().length > 0) {
               return true;
           } else {
               return false;
           }
       } else if (type === 'blob') {
           console.log('blob: ',obj);
           if(obj.size > 0) {
               return true;
           } else {
               return false;
           }
       } else if (type === 'file') {
           for (var key in obj) {
               return true;
           }
           return false;
       } else if (type === 'mouse_event') {
           return true;
       } else if (type === 'keyboard_event') {
           return true;
       } else {
           throw new Error(Object.prototype.toString.call(obj) + ' type is not supported yet');
       }
   };

    service.isNestedObjPresent = function(prnt,str) {
      var retObj=true;
      if (!service.isObjPresent(prnt)) {
          return false;
      }
      strArr= str.split('.');
      for (var i = 0; i < strArr.length; i++) {
          if (!service.isObjPresent(prnt[strArr[i]])) {
            return false;
          }
          prnt = prnt[strArr[i]];
      }
      return true;
    };

    service.getObjType = function(object) { // Would really appreciate a unit test to test all for this as manual testing didn't cover everything
       var prop = {
           '[object Object]': 'object',
           '[object Array]': 'array',
           '[object String]': 'string',
           '[object Boolean]': 'boolean',
           '[object Number]': 'number',
           '[object Null]': 'null',
           '[object Undefined]': 'undefined',
           '[object Function]': 'function',
           '[object Date]': 'date',
           '[object HTMLDivElement]': 'htmlDivElement',
           '[object Blob]': 'blob',
           '[object File]': 'file',
           '[object MouseEvent]': 'mouse_event',
           '[object KeyboardEvent]': 'keyboard_event'

       }
       return prop[Object.prototype.toString.call(object)];
    };


  });
}(angular));
