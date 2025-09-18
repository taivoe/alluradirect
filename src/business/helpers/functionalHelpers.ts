/*  Source: Eric Elliot https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
    Usage:  const pipeLine = pipe(f1, f2, f3,...)
            const result = pipeLine(initialValue)
    Details: Accept an array of functions and return a function that accepts a single argument. 
                Calling this returned function will apply the passed functions in order to the reduce state
*/
export const pipe =
  (...fns: any) =>
  (x: any) =>
    fns.reduce((v: any, f: any) => f(v), x);

/*  Source: Eric Elliot https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
    
    Use if you want pipe functionality but in reverse for some reason
*/
export const compose =
  (...fns: any) =>
  (x: any) =>
    fns.reduceRight((v: any, f: any) => f(v), x);

/* Source: https://javascript.info/currying-partials

    Apply like so:
    function sum(a, b, c) {
        return a + b + c;
    }

    let curriedSum = curry(sum);
    
    curriedSum(1, 2, 3)
    curriedSum(1)(2)(3)
*/
export function curry(func: any) {
  return function curried(...args: any) {
    if (args.length >= func.length) {
      // @ts-ignore
      return func.apply(this, args);
    } else {
      return function (...args2: any) {
        // @ts-ignore
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
