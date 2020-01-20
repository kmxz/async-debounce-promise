
# async-debounce-promise

  Debounce asynchronous functions.
  
  Debouncing means that given function is only run after no calls to it have happened for `x` milliseconds. With functions that do asynchronous work, i.e. not finish in the same tick, you also want no calls to happen while the function is currently running - limit the concurrency to one - and rerun with new arguments afterwards.

## Example

```js
var debounce = require('async-debounce-promise');

async function async(num) {
  return new Promise(done => {
    console.log('start', num);
    setTimeout(() => {
      console.log('done', num);
      done();
    }, 200);
  });
}

var debounced = debounce(async, 50);

console.log('call 1'); debounced(1);
setTimeout(() => { console.log('call 2'); debounced(2) }, 100);
setTimeout(() => { console.log('call 3'); debounced(3) }, 200);
```

  And in the output you can see that the function is run at max once at a time and if the debounce triggers while the function is still running, it will be queued.

```bash
$ node example.js
call 1
start 1
call 2
call 3
done 1
start 3
done 3
```

## Installation

  Install with [npm](https://npmjs.org):
  
```bash
$ npm install async-debounce-promise
```

## API

### fn = debounce(fn, interval)

Returns a decorated version of `fn` that when called calls `fn` only when no further calls have happened for `interval` milliseconds and if it's not currently running. When it's done running and a call has happened while it was still running, it's called again with latest arguments.

`fn` must be an async function returning a `Promise`.

## License

  MIT
