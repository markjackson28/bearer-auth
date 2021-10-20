'use strict';

const base64 = require('base-64');

module.exports = (users) => async (req, res, next) => {
  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [username, pass] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(username, pass)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
    console.log('basic error', e);
  }

}

