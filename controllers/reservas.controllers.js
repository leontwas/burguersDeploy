export default class ReservasControllers {

    constructor(){

    }

    getAllReservas = (req, res) => {
            res.send('get reservas desde controllers');
        }

    createReservas = (req, res) => {
        res.send('post reservas desde controllers');
    } 
    
    updateReservas = (req, res) => {
        res.send('put reservas desde controllers');
    }

    deleteReservas = (req, res) => {
        res.send('delete reservas desde controllers');
    }

}
