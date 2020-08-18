const TEST_USER_ID = 'integration-test-user-id';
const TEST_USER_EMAIL = 'integration-tests@test.com';
const TEST_USER_NAME = 'Integration Test User';

exports.mockFirebaseAuth = {
  uid: TEST_USER_ID,
  token: {
    name: TEST_USER_NAME,
    email: TEST_USER_EMAIL
  }
};