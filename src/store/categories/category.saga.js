import { takeLatest, call, put, all } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';

//We don't have async and await when we're working with generetors
export function* fetchCategoriesAsync() {
  try {

    //call: is used to call a function
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');

    //Sagas are able to fire actions, but isted of use dispatch, we use put. put === dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));

  } catch (error) {
    //if some error happens, please distpach "put", an action.
    yield put(fetchCategoriesFailure(error)); 
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}