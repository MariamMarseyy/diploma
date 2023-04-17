'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'user_details',
        {
          id: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
          },
          user_id: {
            type: Sequelize.CHAR(36),
            unique: true,
            references: {
              model: {
                tableName: 'user',
              },
              key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          surname: {
            type: Sequelize.STRING,
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
      await queryInterface.dropTable('user_details');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
