module.exports = {
  expiresIn: 36000,
  secret:  'mysecretjwt',
  apiUrl : 'http://localhost:4000/api/v1',
  mongoUrl : 'localhost:27017',
  log: {
    output: 'stdout',
    level: 'info'
  }
};
