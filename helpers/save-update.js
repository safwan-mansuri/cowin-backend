const Cowin = require('../models/cowin');

const saveCowinData = async (saveData) => {
  try {
    const cowin = new Cowin(saveData);
    const res = await cowin.save();
    console.log(res);
  } catch (err) {
    console.log('saveCowinData Error', err);
    throw new Error('Error saving data');
  }
}

const updateCowinData = async (updateData) => {
  try {
    await Cowin.updateOne({ pinCode: updateData.pinCode }, updateData );
  } catch (err) {
    console.log('updateCowinData Error', err);
    throw new Error('Error updating data');
  }
}


module.exports = { saveCowinData, updateCowinData };
