
let nums = ['2', '4', '25', '10', '3']; 


function convert(nums) {
   return nums.map(num => {
      return  +num < 10 ? `0${num}` : num;
    })
}

console.log(convert(nums))