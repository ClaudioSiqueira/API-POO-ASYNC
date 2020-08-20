let knex = require('../database/connection')
let bcrypt = require('bcrypt')

class User{

    async findAll(){
        try{
            let users = await knex.select(['id','name', 'email', 'role']).table('users')
                return users
            
        }catch(err){
            console.log(err)
            return []
        }
    }
    

    async findById(id){
        try{
            let user = await knex.select(['id','name', 'email', 'role']).where({id:id}).table('users')
            return user
        }catch(err){
            console.log(err)
            return []
        }
    }


    async new(email, password, name){
        try{
            let hash = await bcrypt.hash(password, 10)
            await knex.insert({name, email, password:hash}).table('users')
        }catch(err){
            console.log(err)
        }
        
    }




    async findEmail(email){
        let result = await knex.select().table('users').where({email: email})
        if(result.length > 0){
            return true
        }else{
            return false
        }
    }
}

module.exports = new User()   