const sut = require('../src/app');
const testServer = require('./test-server');

describe('Given the verzasca tool', () => {
  beforeEach(done => testServer.start(done));
  afterEach(done => testServer.stop(done));

  it('Should pass if one passing build', done => {
    sut(
      {
        builds: ['pass_build_1'],
        url: 'http://localhost:5000',
        testMode: true,
      },
      err => {
        expect(err).to.be.an('undefined');
        done();
      }
    );
  });

  it('Should pass if two passing builds', done => {
    sut(
      {
        builds: ['pass_build_1', 'pass_build_2'],
        url: 'http://localhost:5000',
        testMode: true,
      },
      err => {
        expect(err).to.be.an('undefined');
        done();
      }
    );
  });

  it('Should fail if one failing build', done => {
    sut(
      {
        builds: ['fail_build_1'],
        url: 'http://localhost:5000',
        testMode: true,
      },
      err => {
        expect(err).to.be.an('undefined');
        done();
      }
    );
  });

  it('Should fail if one passing and one failing build', done => {
    sut(
      {
        builds: ['pass_build_1', 'fail_build_1'],
        url: 'http://localhost:5000',
        testMode: true,
      },
      err => {
        expect(err).to.be.an('undefined');
        done();
      }
    );
  });

  it('Should fail if two passing and two failing builds', done => {
    sut(
      {
        builds: [
          'pass_build_1',
          'pass_build_2',
          'fail_build_1',
          'fail_build_2',
        ],
        url: 'http://localhost:5000',
        testMode: true,
      },
      err => {
        expect(err).to.be.an('undefined');
        done();
      }
    );
  });
});
