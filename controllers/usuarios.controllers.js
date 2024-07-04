export default class UsuariosControllers {

    constructor(){

    }

    getAllUsuarios = (req, res) => {
            res.send('get usuarios desde controllers');
        }

    createUsuarios = (req, res) => {
        res.send('post usuarios desde controllers');
    } 
    
    updateUsuarios = (req, res) => {
        res.send('put usuarios desde controllers');
    }

    deleteUsuarios = (req, res) => {
        res.send('delete usuarios desde controllers');
    }

}
