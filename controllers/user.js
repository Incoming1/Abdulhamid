const usersModel = require('../models/user');
const jwt = require('jsonwebtoken')


const registerUser = (req, res) =>{
    console.log(req.body)
    let form = new usersModel(req.body)
    form.save().then(()=>{
        console.log('data saved')
        res.status(500).send({status:true, message: "Usersaved"})
    })
    .catch((err)=>{
        console.log('failed to save');
        console.log(err);
        res.send({message: 'error signing up'})
    })
}

const signInUser = (req, res) => {
    const {email, password} = req.body

    usersModel.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }else{
            let secret = process.env.SECRET
        
            user.validatePassword(password, (err, same)=>{
                if (!same){
                    res.send({status:false, message: 'wrong detail'})
                }else{
                    let token = jwt.sign({email}, secret, {expiresIn: '5h'})
                    res.send({status: true, message: 'welcome', token})
                    console.log(token)
                }
            })
            console.log('user exist')
        }
    }).catch((err)=>{
        console.log(err)
    })
}

// Delete User
const deleteUser = (req, res) => {
    const userId = req.user.id;
  
    usersModel.findByIdAndDelete(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json({ message: 'User deleted successfully' });
      })
      .catch(err => {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Server error' });
      });
  };


module.exports = {registerUser, signInUser, deleteUser}