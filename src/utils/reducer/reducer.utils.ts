//action for create generics ones
import { AnyAction } from 'redux';

//Action with payload
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

//This Action is the base one, it does not have a payload because we're narrowing 
//our scope to not persist undefined or null payload in our store.
export type Action<T> = {
  type: T;
};

//Function Overloading (from TS not JS): It allow us to make multiple function type
//definitions on the same name. so we can have multiple type definition
//for create action.

//!!!  For function overloading  you must have the same number of parameters.
//ex: function func(type:string):void, function func(type:string):number, function func(type:string):string
/*
TypeScript provides the concept of function overloading. You can have multiple functions with the same name but different parameter types and return type. However, the number of parameters should be the same.
 */

//just signature, no implementation
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

//just signature, no implementation
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

/*export function createAction<T extends number>(
  type: T,
  payload: boolean
): ActionWithPayload<number, boolean>;*/

//this is the implementation of the above signature. if you move this code up you'll get an error.
export function createAction<T extends string, P>(
  type: T, 
  payload: P) {
  return { type, payload }; //implementation of function overloading
}


/*const test = createAction("Bozo",{id:1});
test.type;
test.payload.id;
const test2 = createAction("Parameterless");
test2.type;


const mytest = createAction(1,false);
const n1:number = mytest.type;
const t2 = mytest.payload;*/

//here we're using an intersection (union two classes in an hybrid one)
type Matchable<AC extends () => AnyAction> = AC & { //AC: means action creator
  type: ReturnType<AC>['type']; //ReturnType returns the type that was defined in the generic AC AC['type'] 
  match(action: AnyAction): action is ReturnType<AC>; //checks the type is equals, if yes intersection
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
};

/*
//function overloading


export type MyBozoType <T> ={
  anything:T
};

export function doSomething<T extends string>(
  type: T
): MyBozoType<T>;

export function doSomething<T extends boolean>(
  type: T
): void;

export function doSomething<T extends object>(
  type: T
): MyBozoType<T>;

export function doSomething<T extends number>(
  type: T
): MyBozoType<T>;

export function doSomething<AnyShit>(
  type: AnyShit
): AnyShit;

export function doSomething(a:any): any {
  return a ;
}

var a = doSomething("sheet");
console.log(a.anything);

var obj = doSomething({id:1, name:'test'});
console.log(obj.anything.name);

function add(a:string, b:string):string;

function add(a:number, b:number): number;

function add(a:boolean, b:boolean): boolean;

function add(a: any, b:any): any {
  return a + b;
}
*/



/*
This is a red pill
everything is an objecxt in javascript. even functions.
it means that you can add some methods to your function.
Javascript allows a function to have a function:

var myFunc = ()=> console.log('hit');
myFunc(); // hit

so far so good, but look at this:
myFunc.match = () => console.log('hat');
myfunc() //hit
myfunc.match() //hat

this is a way to extend your function

incredible !!!
*/

/*
//ReturnType
//Constructs a type consisting of the return type of function Type.

type t1 = ReturnType<()=> string>;

const myFunction1 = (): t1 =>{
  return "good job";
}

const result:string = myFunction1();

type t3 = {
  a:number;
  b:number;
  j:number;
}

type t2 = ReturnType<(a:number,b:number)=> t3>;

const myFunction2 = (): t2 =>{
  return {a:1, b:3, j:400};
}

const result2: t2 = myFunction2();
console.log(result2.j);
*/