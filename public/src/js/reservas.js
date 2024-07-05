const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensaje: 'Acá está tu reserva: '})
});

export default router;