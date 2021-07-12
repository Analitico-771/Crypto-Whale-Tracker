
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
