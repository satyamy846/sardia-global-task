// Palindrome function 
const name = "aba";

function checkPalindrome(name){
    const arr = name.split('');
    console.log("s -", arr)
    let newArr = [];
    for(let i=arr.length - 1; i>=0;i--){
        newArr.push(arr[i]);
    }
    
    console.log(newArr)
    const newName = newArr.join("");
    console.log("new - ", newName);
    if(newName === name){
        return true;
    }
    return false;
    
}

console.log(checkPalindrome(name));