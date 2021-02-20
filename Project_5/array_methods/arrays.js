function smallOne(a, b){
    if (a < b){
        return a
    }
    return b

}

function rotateRight(arr){
    let lastElement = arr.pop()
    arr.unshift(lastElement)
}

function rotateLeft(arr){
    arr.push(arr.shift())
}