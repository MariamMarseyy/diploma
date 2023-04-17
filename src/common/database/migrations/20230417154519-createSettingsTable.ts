'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'settings',
        {
          id: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          deleted_at: Sequelize.DATE,
        },
        { charset: 'utf8', collate: 'utf8_general_ci', transaction: t },
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('settings');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
