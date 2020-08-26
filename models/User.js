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

    async findByEmail(email){
        try{
            let user = await knex.select(['id','name', 'email', 'role']).where({email:email}).table('users')
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


    async update(id, email, name, role){
        try{
            let emailDup = false
            if(email != undefined){
                let emailDup = await this.findEmail(email)
            }
            if(emailDup == false){
                if(email != undefined){
                    await knex.where({id:id}).update({email:email}).table('users')
                }
                if(name != undefined){
                    await knex.where({id:id}).update({name:name}).table('users')
                }
                if(role != undefined){
                    await knex.where({id:id}).update({role:role}).table('users')
                }
                return 1
            }else{
                return 0
            }
        }catch(err){
            console.log(err)
        }
    }


    async delete(id){
        try{
            await knex.where({id:id}).delete().table('users')
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