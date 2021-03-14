let doneWithHomework = true
let doneWithChores = true

//USING CALLBACKS
function canIWatchTV(successCallback, errorCallback) {
    if(doneWithChores && doneWithHomework) {
        successCallback()
    } else {
        errorCallback()
    }
}

canIWatchTV(() => {
    console.log('Yes you can watch tv')
}, () => {
    console.log('No, sorry')
})

//USING PROMISES

function canIWatchTVPromise(){
    return new Promise((resolve, reject) => {
        if(doneWithHomework && doneWithChores){
            resolve('Yes you can watch TV')
        } else {
            reject('No sorry')
        }
    })
}

canIWatchTVPromise()
    .then((message) => {
        console.log(message)
    })
    .catch((err) => {
        console.log(err)
    })

const URL = 'https://jsonplace-univclone.herokuapp.com/todos'

fetch(URL)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch(() => {
        console.log("There was an Error!")
    })