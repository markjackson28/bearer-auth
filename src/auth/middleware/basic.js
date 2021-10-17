'use strict';

const base64 = require('base-64');
const { Users } = require('../models/index.js')

// module.exports = async (req, res, next) => {

//   if (!req.headers.authorization) { return _authError(); }

//   let basic = req.headers.authorization;
//   let [username, pass] = base64.decode(basic).split(':');

//   try {
//     req.user = await user.authenticateBasic(username, pass)
//     next();
//   } catch (e) {
//     res.status(403).send('Invalid Login');
//   }

// }

module.exports = (users) => async (req, res, next) => {
  // console.log('req.headers', req.headers);
  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [username, pass] = base64.decode(basic).split(':');
  // console.log(username, pass);

  try {
    req.user = await users.authenticateBasic(username, pass)
    // console.log('inside basic', req.user);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
    console.log('basic error', e);
  }

}

