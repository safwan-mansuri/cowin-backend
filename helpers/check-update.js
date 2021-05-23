
const telegramNotification = require('../helpers/send-notifier');
const { updateCowinData } = require('../helpers/save-update');
const getData = require('../helpers/get-data');

const checkUpdate = async (cowinData) => {
  try {
    cowinData.forEach(async (currentData) => {
      console.log(currentData);
      const newData = await getData(currentData.pinCode);
      console.log(newData)
      newData.pinCode = currentData.pinCode;
        if (newData.vaccineTotal !== currentData.vaccineTotal) {
          console.log('update !!!');
          await telegramNotification(newData);
          await updateCowinData(newData);
        } 
      console.log('done !!!');
    });
  } catch (err) {
    console.log('checkUpdate Error', err);
    throw new Error('cant check for updates');
  }
}

module.exports = checkUpdate;
