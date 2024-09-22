var foo = 'outside';

function logIt() {
  console.log(foo); var foo = 'inside';
  }
logIt();
