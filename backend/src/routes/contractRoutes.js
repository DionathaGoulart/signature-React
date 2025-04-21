const express = require('express');
const router = express.Router();
const { validateContractEmail } = require('../middlewares/validation');
const { sendContract } = require('../controllers/contractController');

router.post('/send-contract', validateContractEmail, sendContract);

module.exports = router;