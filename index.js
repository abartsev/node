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
    
    fs.exists('./newDir', (exists) => {
        if (!exists) {
            fs.mkdir('./newDir', ()=>{})
        }
    })
    
    fs.readdir(base, (err, files) => {
        if(err){
            return err
        }
        // if (!files.length && path.join(base) !== 'dir' ) {
        //     fs.rmdir(base, (err) => {
        //         if (!err) {
        //             readFn(path.join(base, '../'),)
        //         }  
        //     })
            
        // }
        
        files.forEach(item => {
            
            let localBase = path.join(base, item)

            fs.stat(localBase, (err, state) => {
                if(err){
                    return err
                }
                if (state.isDirectory()) {
                    readFn(localBase, level + 1)
                } else {
                    let newdir = path.join('newDir', item.slice(0, -(item.length-1)).toUpperCase())

                    fs.exists(newdir, (exists) => {
                        if (!exists) {
                            fs.mkdir(newdir, ()=>{
                                fs.link(localBase, path.join(newdir, item), (err ) => {
                                    if(!err){
                                        console.log(level, ': ',base,' --> ',newdir)
                                        fs.unlink(localBase, ()=>{})
                                    } else {
                                        console.log(err)
                                    }
                                })
                            })
                        } else {
                            fs.link(localBase, path.join(newdir, item), (err ) => {
                                if(!err){
                                    console.log(level, ': ',base,' --> ',newdir)
                                    fs.unlink(localBase, ()=>{})
                                } else {
                                    console.log(err)
                                }
                            })
                        }
                    })
   
                }
            })
        })
    })
}

recursFn('dir')
readFn('dir')