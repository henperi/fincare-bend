import model from '../models';

const {
  CustomerProfile, Address, NextOfKin, StaffProfile,
} = model;

const includes = {
  CustomerProfile: { model: CustomerProfile, as: 'Profile' },
  Address: { model: Address, as: 'Address' },
  NextOfKin: { model: NextOfKin, as: 'NextOfKin' },
  StaffProfile: { model: StaffProfile, as: 'Profile' },
};

export default includes;
