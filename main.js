let s = "yashhhede";

const indexer = (s) => {
    s = s.split('');
    let letterMap = [];

    s.forEach((item,index) => {
        letterMap[item] = letterMap[item] || [];
        letterMap[item].push(index);
    });
    return letterMap;
}

let ans = indexer(s);
console.log(ans)