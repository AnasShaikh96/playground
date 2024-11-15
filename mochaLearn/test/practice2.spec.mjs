// import axios from 'axios';
// import * as chai from 'chai'
// import { Practice2 } from '../practice2.js'
// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';

// const expect = chai.expect;
// chai.use(sinonChai);

// describe('get a user from name', () => {

//   it('should get a user', (done) => {

//     const expectedRes = { data: { id: 123 } }

//     const user = new Practice2('AnasShaikh96');
//     const getStub = sinon.stub(axios, 'get').resolves(expectedRes);

//     user.getUserId()
//       .then(result => {
//         expect(result).to.be.a('number')
//         expect(result).to.be.eq(123)
//         // expect(getStub).to.have.been.calledOnce
//         // expect(getStub).to.have.been.calledWith('https://api.github.com/users/codebubb');

//         done()

//       })
//       .catch(done)
//   })
// })