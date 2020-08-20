class HomeController{

    async index(req, res){
        res.send("Home Contoller");
    }

}

module.exports = new HomeController();