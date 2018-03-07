import { expect } from 'chai';
import { createMapper } from '../src';

describe('createMapper', function () {
  it('should correctly map one object to the spec of the mapping', function () {

    const mapping = {
      first: 'user.firstName',
      last: 'user.lastName',
      ageInMonths: {
        path: 'user.age',
        transform: (age) => {
          return age * 12;
        },
      },
    };

    const mapper = createMapper(mapping);

    const obj = {
      user: {
        firstName: 'Joe',
        lastName: 'Blow',
        age: 12,
      },
    };

    const mappedObj = mapper(obj);

    expect(mappedObj).to.eql({ first: 'Joe', last: 'Blow', ageInMonths: 144 });
  });
});