function push(arr, element) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += 1) {
        newArr[i] = arr[i];
    }
    newArr[newArr.length] = element;
    return newArr;
}

module.exports = push;
