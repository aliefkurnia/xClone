const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: console.log
});

async function runMigrations() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connected successfully!');
    
    const fs = require('fs');
    const modelsPath = path.join(__dirname, 'models');
    
    // Import all models
    const models = {};
    
    fs.readdirSync(modelsPath).forEach(file => {
      if (file.endsWith('.js')) {
        const model = require(path.join(modelsPath, file));
        const modelName = file.replace('.js', '');
        models[modelName] = model(sequelize, require('sequelize').DataTypes);
      }
    });
    
    // Setup associations
    Object.keys(models).forEach(modelName => {
      if (models[modelName].associate) {
        models[modelName].associate(models);
      }
    });
    
    console.log('Syncing models...');
    await sequelize.sync({ alter: true });
    console.log('All models synced successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
