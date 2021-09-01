let arr = [10, 26, 18];
let sum = 0;

function getSum() {
  for(let i = 0; i < arr.length; i++) {
     sum += arr[i];
    
  }
  return sum;
}
console.log(getSum());
