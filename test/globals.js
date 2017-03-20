const chai = require('chai');
global.should = chai.should();

global.sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

global.expect = chai.expect;
global.mockery = require('mockery');
