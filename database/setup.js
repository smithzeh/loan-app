const { Sequelize, DataTypes } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize("loan_app", "user", "password", {
    host: "localhost",
    dialect: "sqlite",
    storage: "./loan_app.sqlite"
});

// Define LoanApplication model
const LoanApplication = sequelize.define("LoanApplication", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Pending"
    }
});

// Sync database
(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Database synced successfully.");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
})();

module.exports = { sequelize, LoanApplication };