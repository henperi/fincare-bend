import { times } from 'lodash';
import faker from 'faker/locale/en';
import model from '../../models';
import generateAuthToken from '../../helpers/generateAuthToken';

const { Staff, StaffProfile } = model;
faker.seed(555);

const seedSuperAdmin = () => {
  try {
    times(1, async () => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const randomId = faker.random.alphaNumeric(5);

      const superAdmin = await Staff.create(
        {
          uniqueId: randomId,
          email: faker.internet.email(firstName, lastName),
          password: faker.internet.password(),
          level: 'SuperAdmin',
          Profile: {
            fullname: `${firstName} ${lastName}`,
            phone: faker.phone.phoneNumber(),
          },
        },
        { include: [{ model: StaffProfile, as: 'Profile' }] },
      );
      const token = generateAuthToken(superAdmin);
      console.log(token);
    });
  } catch (error) {
    console.log(error);
  }
};

seedSuperAdmin();

export default seedSuperAdmin;
