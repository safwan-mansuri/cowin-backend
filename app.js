require('dotenv').config()
const mongoose = require('mongoose');
const Cowin = require('./models/cowin');
const express = require('express');
const cors = require('cors');

const checkUpdate = require('./helpers/check-update');
const { saveCowinData } = require('./helpers/save-update');
const getData = require('./helpers/get-data');
const { telegramNotification }= require('./helpers/send-notifier');
const numberExists = require('./helpers/pincode-exists');

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {app.listen(5000)})
  .catch((err) => {console.log(err)});

app.post('/', async (req, res) => {
  try {
    const { pinCode } = req.body;
    const isPinCodeExists = await numberExists(pinCode)
    console.log(isPinCodeExists);
    if (isPinCodeExists) {
      throw new Error('pincode already used');
    }
    const saveData = await getData(pinCode);
    saveData.pinCode = pinCode;
    
    await telegramNotification(saveData);
    await saveCowinData(saveData);

    const response = {
      statusCode: 200,
      body: { message: 'data saved successfully !!!' }
    }
    return res.send(response);
  } catch (err) {
    console.log(err);
    const response = {
      statusCode: 500,
      body: { message: err.message }
    };
    return res.send(response);
  }
})

app.post('/update', async (req, res) => {
  try {
    const cowinData = await Cowin.find();
    await checkUpdate(cowinData);
    const response = {
      statusCode: 200,
      body: { message: 'check update successfully !!!' }
    }
    return res.send(response);
  } catch (err) {
    const response = {
      statusCode: 500,
      body: { message: err.message }
    }
    return res.send(response);;
  }
})
