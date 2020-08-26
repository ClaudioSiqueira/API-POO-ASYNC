let User = require('../models/User')
const knex = require('../database/connection')
const { findById } = require('../models/User')
const PasswordToken = require('../models/PasswordToken')
class UserController{


    async index(req, res){
        let users =  await User.findAll()
        if(users != []){
            res.status(200)
            res.json({users: users})
            return
        }else{
            res.status(404)
            res.send('Nenhum usuário no banco.')
            return
        }
    }

    async findOne(req, res){
        let id = req.params.id
        if(isNaN(id)){
            res.status(400)
            res.json({err: "ID não é um número"})
            return
        }
        let user = await User.findById(id)
        if(user.length > 0){
            res.status(200)
            res.json({user: user})
        }else{
            res.status(404)
            res.json({err: 'Nenhum usuário com o id: ' + id})
        }

    }
    
    async create(req, res){
        let {name, email, password} = req.body
        if(name != undefined && email != undefined && password!= undefined){
            if(await User.findEmail(email)){
                res.status(406)
                res.send('Email duplicado')
                return;
            }else{
                await User.new(email, password, name)
                res.status(200)
                res.send('Tudo OK')
                return; // Tem que ter pra encerrar de vez
            }
        }else{
            res.status(400)
            res.json({err: 'Dados em um formato inválido !'})
            return;
        }
    }

    async edit(req, res){
        let id = req.params.id
        if(isNaN(id)){
            res.status(400)
            res.json({err: "ID não é um número"})
            return
        }
        let trueId = await User.findById(id)
        if(trueId.length > 0){
        let {email, name, role} = req.body
        let result = await User.update(id, email, name, role)
        if(result == 1){
            res.status(200)
            res.send('Update feito com sucesso')
            }
                
            }else{
                res.status(404)
                res.json({err: 'Nenhum usuário com o id: ' + id})
                return
            }
        }

        async del(req, res){
            let id = req.params.id
            if(isNaN(id)){
                res.status(400)
                res.json({err: "ID não é um número"})
                return
            }
            let result = await User.findById(id)
            if(result.length > 0){
                await User.delete(id)
                res.status(200)
                res.send('Usuário ' + id + ' deletato com sucesso')
                return
            }else{
                res.status(404)
                res.json({err: 'Nenhum usuário com o id: ' + id})
                return
            }
        }

        async recoverPassword(req, res){
            let email = req.body.email
            let result = await PasswordToken.create(email)
            if(result.status){
                res.status(200)
                res.send("" + result.token)
            }else{
                res.status(406)
                res.send(result.err)
            }
        }


}

module.exports = new UserController