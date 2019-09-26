const fs = require('fs')
const path = require('path')

var count = 10,
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

const readFn = (base, level = 0) => { 
    
    if (!fs.exists('./newDir')) {
        fs.mkdir('./newDir', ()=>{})
    }
    
    fs.readdir(base, (err, files) => {
        
        files.forEach(item => {
            let localBase = path.join(base, item)
            let state = fs.statSync(localBase)
            
            if (state.isDirectory()) {
                readFn(localBase, level + 1)
            } else {
                let newdir = path.join('newDir', item.slice(0, -(item.length-1)))

                if (!fs.exists(newdir)) {
                    fs.mkdir(newdir,()=>{})
                }
                
                fs.link(localBase, newdir+'/'+item, () => {
                    console.log(level, ': ',base,' --> ',newdir)
                    fs.unlink(localBase, ()=>{})
                })
                
            }
        })
    })
}

recursFn('dir')
readFn('./dir')