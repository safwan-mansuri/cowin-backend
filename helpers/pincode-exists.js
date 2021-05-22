const { response } = require('express');
const Cowin = require('../models/cowin');

const numberExists = async (pinCode) => {
  try {
    console.log('PinCode', pinCode);
    const resp = await Cowin.find({ pinCode });
    console.log(resp);
    if (resp.length) {
      return true;
    }
    return false; 
  } catch (err) {
    console.log('pinCodeExists Error', err);
    throw new Error();
  }
}

module.exports = numberExists;
