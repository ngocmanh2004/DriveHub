'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class courseqr extends Model {
        static associate(models) {
            // 1 courseqr -> nhiều qr
            courseqr.hasMany(models.qr, {
                foreignKey: 'courseId',
                sourceKey: 'id',
                as: 'qrs',
            });
        }
    }

    courseqr.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            type: {
                type: DataTypes.ENUM(
                    'CCCD',
                    'GPLX',
                    'BANK_VIETQR',
                    'BILL_QR',
                    'E_GOV',
                    'HEALTH_QR',
                    'E_TICKET',
                    'WAYBILL',
                    'PRODUCT_QR',
                    'VOUCHER',
                    'OTHER'
                ),
                allowNull: false,
                defaultValue: 'CCCD',
            },
        },
        {
            sequelize,
            modelName: 'courseqr',
            tableName: 'CourseQR',
            timestamps: true,
        }
    );

    return courseqr;
};
