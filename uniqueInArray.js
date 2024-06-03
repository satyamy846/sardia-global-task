const arr = [1,2,1,1,2,3,4,4];
const map = new Map();
// initilising map to store their frequencies of every element within array
arr.forEach((item) => {
    if(map.has(item)){
        map.set(item,map.get(item)+1);
    }
    else{
        map.set(item, 1);
    }
});

// console.log(map);
let ans = [];
// traversing the map and checks whose frequency is 1 then push it to new array.
map.forEach((value, key)=>{
    if(value===1){
        ans.push(key);
    }
});

console.log("Ans = ", ans);