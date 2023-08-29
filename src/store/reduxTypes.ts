import { Dispatch } from 'redux';
import { AddToCartAction } from './cartActions'; // Assuming you have an AddToCartAction type

export type AppDispatch = Dispatch<AddToCartAction>;