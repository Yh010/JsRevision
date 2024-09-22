const trimmer = (s) => {
  return  s.trim().split(" ").map(replaceCapWithSpaceAndCap).map(item => item.toLowerCase().trim()).join(' ').split(' ').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' ')
}


function replaceCapWithSpaceAndCap(s){
  return  s.replace(/([A-Z])/, (match, replaceWith) => ` ${replaceWith}`)
}

const camelCaseText = "the simplestThings in LIFE are alwaysThe best"

console.log(trimmer(camelCaseText))