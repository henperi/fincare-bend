import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
const { expect } = chai;

describe('Basic Test Suit for the app', () => {
  it('should return 404 for invalid endpoints', async () => {
    const res = await chai.request(app).get('/invalid-endpoint');

    expect(res.status).to.equal(404);
    expect(res.body).to.be.an('object');
    expect(res.body.success).to.equal(false);
    expect(res.body.errors[0].message).to.equal('This endpoint does not exist');
  });
});
