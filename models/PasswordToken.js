let knex = require('../database/connection')
let Users = require('./User')
const User = require('./User')

class passwordToken{

    async create(email){

        try{
            let user = await User.findByEmail(email)
            if(user.length > 0 ){
                let token = Date.now()
                await knex.insert({
                    user_id : user.id,
                    used : 0,
                    token : token
                }).table('passwordtokens')
                return {status: true, token: token}
            }else{
                return {err: 'O email passado não está cadastrado'}
            }
        }catch(err){
            console.log(err)
            return {err: err}
        }

    }
}

module.exports = new passwordToken()