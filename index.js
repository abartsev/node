const fs = require('fs')
const path = require('path')

var count = 20,
pathNew = ''
const recursFn = (name) => {
   
    pathNew = (!pathNew) ? name : pathNew + '/' + name
    if (!count) {
        return
    }
    
    fs.mkdir(pathNew, () => {})

    for (let index = 0; index < randFn().rand; index++) {
        fs.writeFile(path.join(pathNew,randFn().name+'.png'), '3e3e', () => {})  
    }

    if (randFn().rand % 2 !== 0 && pathNew !== 'dir') {
        pathNew = pathNew.split('/').slice(0,-1).join('/')  
    }

    count -= 1
    recursFn(randFn().name)
}

const randFn = () => {
    let rand = Math.floor(Math.random() * 6) + 1
    let name = Math.random().toString(36).substring(5)
    return {
        rand,
        name
    }
}

const readFn = () => {
    
}
recursFn('dir')
readFn()