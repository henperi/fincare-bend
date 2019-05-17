import { times } from 'lodash';
import faker from 'faker/locale/en';
import model from '../../models';

const { Staff, StaffProfile } = model;
faker.seed(555);

const seedSuperAdmin = () => {
  try {
    times(1, () => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const randomId = faker.random.alphaNumeric(5);

      Staff.create(
        {
          uniqueId: randomId,
          email: faker.internet.email(firstName, lastName),
          password: faker.internet.password(),
          phone: faker.phone.phoneNumber(),
          level: 'SuperAdmin',
          Profile: {
            fullname: `${firstName} ${lastName}`,
          },
        },
        { include: [{ model: StaffProfile, as: 'Profile' }] },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

seedSuperAdmin();

export default seedSuperAdmin;
