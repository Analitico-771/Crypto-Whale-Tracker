
// *you can put multiple action creators in this file
// *because you're using export not export default

/**
 * ? This is not a named export.  When you import into your component, you have to 
 * ? use the following 
 * 
 * * import {increment} from ./path
 */

 import {SUBMIT} from './types';
 import {REMOVE} from './types';
 import {INCREMENT} from './types';
 import {DECREMENT} from './types';

 export const submit = (t, n) => {
 
   return {
     type: SUBMIT,
     data: {address: t,
      data: n
    }
   };
 
 };
 
 export const remove = (t) => {
 
   return {
     type: REMOVE,
     address: t //consider using id
   };
 
 };
 
 export const increment = (n) => {
 
   return {
     type: INCREMENT,
     data: n
   };
 
 };
 
 export const decrement = (n) => {
 
   return {
     type: DECREMENT,
     data: n
   };
 
 };
