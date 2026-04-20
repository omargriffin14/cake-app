const mysql = require('mysql2/promise');
const AWS = require('aws-sdk');

const client = new AWS.SecretsManager({ region: 'us-east-1' });

let pool;

const getSecret = async () => {
  const secret = await client.getSecretValue({ 
    SecretId: 'cake-app/db-credentials' 
  }).promise();
  return JSON.parse(secret.SecretString);
};

const initPool = async () => {
  const credentials = await getSecret();

  pool = mysql.createPool({
    host:     credentials.host,
    database: credentials.database,
    user:     credentials.username,
    password: credentials.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  console.log('Database pool initialized');
  return pool;
};

const getPool = () => {
  if (!pool) throw new Error('Pool not initialized. Call initPool first.');
  return pool;
};

module.exports = { initPool, getPool };
