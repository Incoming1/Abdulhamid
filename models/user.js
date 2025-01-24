const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

let userInfo = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password:{type: String, required: true},
    registerationDate:{type:Date, default: Date.now()}
})

let saltRound = 10

userInfo.pre('save', function(next){
    bcrypt.hash(this.password, saltRound, (err, hashedpasword) =>{
        console.log(hashedpasword)
        if (err){
            console.log(err)
        } else{
            this.password = hashedpasword;
            next()
        }
    })
})

userInfo.method.validatePassword = function(password, callback){
    bcrypt.compare(password, this.password, (err, same)=>{
        if (!err){
            callback(err, same)
        }else{
            next()
        }
    })
}

const userModel = mongoose.model('userCredentials', userInfo)

module.exports = userModel