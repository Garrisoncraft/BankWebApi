const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendContactEmail(name, email, message);
    res.status(200).send('Message sent successfully!');
  } catch (error) {
    res.status(500).send(error.toString());
  }
}); 
//call or whatsapp +250791955398 for more
module.exports = router;
