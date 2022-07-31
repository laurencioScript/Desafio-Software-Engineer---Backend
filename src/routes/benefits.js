const router = require('express').Router();
const seekCustomerBenefits = require('./../services/seekCustomerBenefits');

router.get('/benefits', (req, res) => {
    try {
        const { cpf, user, password } = req.body;

        if(!cpf || !user || !password){
        return res.status(422).send('Server on')
        }

        user = 'RodGom21';
        password = 'konsi2022*';
        cpf = '8889251743';

        const giftNumber = await seekCustomerBenefits({cpf, user, password });

        return res.status(200).send({giftNumber})

    } catch (error) {
        console.log('>>> error', error);
        if(error.showMessage){
        return res.status(400).send(error.showMessage);
        }
        return res.status(400).send('There was a problem on the server');
    }
});

module.exports = (app) => app.use("/", router);
