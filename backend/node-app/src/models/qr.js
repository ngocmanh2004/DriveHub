'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class qr extends Model {
        static associate(models) {
            // Mỗi qr thuộc về 1 courseqr
            qr.belongsTo(models.courseqr, {
                foreignKey: 'courseId',
                targetKey: 'id',
                as: 'course',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            });
        }
    }

    qr.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            courseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING(1024),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(1024),
                allowNull: true,
            },
            
        },
        {
            sequelize,
            modelName: 'qr',
            tableName: 'QR',
            timestamps: true,
        }
    );

    return qr;
};
