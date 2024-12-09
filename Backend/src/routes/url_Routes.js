const express = require('express');
const { createUrl, deleteUrl, editUrl, links } = require('../controller/url_controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/create', authenticate, createUrl);
router.delete('/delete/:shortURL', authenticate, deleteUrl);
router.put('/edit/:shortURL', authenticate, editUrl);
router.get('/links', authenticate, links);

module.exports = router;
