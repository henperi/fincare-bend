import { times } from 'lodash';
import faker from 'faker/locale/en';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

import model from '../../models';
import generateAuthToken from '../../helpers/generateAuthToken';
import generateStaffId from '../../helpers/generateStaffId';
import { hashPassword } from '../../helpers/passwordHelpers';
import generateRefNumber from '../../helpers/generateRefNo';

const { Op } = Sequelize;

dotenv.config();

const { Staff, StaffProfile } = model;
faker.seed(555);

const seedSuperAdmin = () => {
  try {
    times(1, async () => {
      const {
        SU_FIRSTNAME, SU_LASTNAME, SU_PASSWORD, SU_PHONE, SU_EMAIL,
      } = process.env;

      const staff = await Staff.findOne({
        where: {
          [Op.or]: [{ email: SU_EMAIL.trim() }, { level: 'SuperAdmin' }],
        },
      });

      if (staff) {
        const message = process.env.NODE_ENV !== 'production'
          ? 'Either Super Admin is seeded or this email is Taken'
          : '';
        console.log(message);
        return process.exit();
      }

      const hashedPassword = hashPassword(SU_PASSWORD.trim());

      const superAdmin = await Staff.create(
        {
          uniqueId: generateStaffId(),
          secreteKey: `${generateRefNumber()}-${SU_EMAIL}`,
          email: SU_EMAIL,
          password: hashedPassword,
          level: 'SuperAdmin',
          Profile: {
            fullname: `${SU_FIRSTNAME} ${SU_LASTNAME}`,
            phone: SU_PHONE,
          },
        },
        { include: [{ model: StaffProfile, as: 'Profile' }] },
      );

      const token = process.env.NODE_ENV !== 'production' ? generateAuthToken(superAdmin) : '';
      console.log(token);
      return process.exit();
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedSuperAdmin();

export default seedSuperAdmin;
