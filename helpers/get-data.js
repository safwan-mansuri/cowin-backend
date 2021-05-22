require('dotenv').config()
const axios = require('axios');

const getData = async (pinCode) => {
  try {
    const [ month, date, year ] = new Date().toLocaleString().split(',')[0].split('/');
    const url = `${process.env.API}${pinCode}&date=${date}-${month}-${year}`;
    const response  = await axios.get(url, { headers: { 
      "Host": 'cdn-api.co-vin.in',
      'User-Agent': process.env.USER_AGENT
    }});
  
    const centers = response.data.centers;
  
    let vaccineTotal = 0;
    let doseOne = 0;
    let doseTwo = 0;
  
    centers.forEach((center) => {
      center.sessions.forEach((session) => {
        vaccineTotal+=session.available_capacity;
        doseOne+=session.available_capacity_dose1;
        doseTwo+=session.available_capacity_dose2;
      })
    })
  
    return {
      centers: centers.length,
      vaccineTotal,
      doseOne,
      doseTwo,
    };
  } catch (err) {
    console.log(err);
    throw new Error('cant fetch data from cowin website/api')
  }
}

module.exports = getData;
