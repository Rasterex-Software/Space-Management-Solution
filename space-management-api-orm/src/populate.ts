import axios from 'axios';
import * as faker from 'faker';

const api_url = "http://localhost:3000";

let tenants = [];
const numberOfTenants = 7;
faker.seed(123);

for ( let i=1; i<numberOfTenants; i++){
    const fName = faker.name.firstName();
    const lName = faker.name.lastName();
    const phone = faker.phone.phoneNumberFormat();
    // const image = faker.image.avatar();
    // const image = faker.internet.avatar();
    const email = faker.internet.email();
    // const color = faker.internet.color();
    const description = faker.lorem.sentence(10);

    const tenant = {
        firstName: fName,
        lastName: lName,
        label: lName + ' ' + fName,
        description: description,
        phone: phone,
        email: email
    }
    tenants.push(tenant);
}
axios.post(api_url+'/tenants/bulk',{bulk:tenants})
  .then(function (response) {
   // console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });;

const areas = [];
areas.push({
    "id": 22,
    "label":"A1",
    "description":"",
    "surface": 10,
    "type":"common"
});

axios.post(api_url+'/areas/bulk',{bulk:areas});