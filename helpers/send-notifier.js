require('dotenv').config();
const { Telegraf } = require('telegraf');
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const sendMobileNotification = async (newData) => {
  try {
    let msg = `Total ${newData.vaccineTotal} available at your pincode ${newData.pinCode}. 
    visit vaccine https://www.cowin.gov.in/home in jiffy to book a slot. we will keep you updating`;
    
    await client.messages.create({
      body: msg,
      from: process.env.TWILIO_NUMBER,
      to: `+91${newData.mobileNumber}`
    });
  } catch (err) {
    console.log('sendNotification Error', err);
    throw new Error('cant send the notifications');
  }
}

const telegramNotification = async (newData) => {
  try {
    let msg = `Total ${newData.vaccineTotal} available at your pincode ${newData.pinCode}. 
    visit vaccine https://www.cowin.gov.in/home in jiffy to book a slot. we will keep you updating`;

    await bot.telegram.sendMessage(process.env.USERNAME, msg);
  } catch (err) {
    console.log('telegramNotification Error', err);
    throw new Error('cant send the notifications');
  }
}

module.exports = { sendMobileNotification, telegramNotification }
