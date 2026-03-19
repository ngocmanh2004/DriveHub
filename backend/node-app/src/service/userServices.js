// get the client
import mysql2 from 'mysql2/promise';
import bluebird from 'bluebird';
import bcryptjs from 'bcryptjs';
import db from '../models/index.js';//connectdb

// create the connection to database
// create the connection, specify bluebird as Promise

// query database

const salt = bcryptjs.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    return bcryptjs.hashSync(userPassword, salt);
}
const createUserService = async (userEmail, userName, userPassword) => {
    let userHashPassword = hashUserPassword(userPassword);
    // connection.query(
    //     'INSERT INTO `user`(`userEmail`, `userPassword`) VALUES (?,?)', [userEmail, userHashPassword],
    //     function (err, results, fields) {
    //         console.log(results); // results contains rows returned by server
    //         console.log(fields); // fields contains extra meta data about results, if available
    //     }
    // );
    // return userHashPassword;
    try {
        await db.User.create({
            userEmail: userEmail,
            userName: userName,
            userPassword: userHashPassword
        })
    } catch (error) {
        console.log(">>> Check error: ", error);
    }
}
const getUserList = async () => {
    //test relationship
    // let newUser = await db.User.findOne({
    //     where: { id: 1 },
    //     attributes: ["userName", "userEmail"],
    //     include: { model: db.Group, attributes: ["name", "description"] },
    //     raw: true, //trả ra 1 objet của js,
    //     nest: true //gộp đống bắt đầu 1 tên thành 1 object
    // })
    // console.log("New user >>>>>> ", newUser);


    // let roles = await db.Role.findAll({

    //     include: { model: db.Group, where: { id: 1 } },
    //     raw: true, //trả ra 1 objet của js,
    //     nest: true //gộp đống bắt đầu 1 tên thành 1 object
    // })
    // console.log("All roles >>>>>> ", roles);
    // connection.query(
    //     'SELECT * FROM `user`',
    //     function (err, results, fields) {
    //         console.log(results); // results contains rows returned by server
    //         // console.log(fields); // fields contains extra meta data about results, if available
    //     }
    // );
    // const connection = await mysql2.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    let users = [];
    try {
        users = await db.User.findAll();
        return users;
    } catch (error) {
        console.log(">>> Check error: ", error);
    }

}
const deleteUser = async (id) => {
    // const connection = await mysql2.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM `user` WHERE id= ?', [id]);
    //     return rows;
    // } catch (error) {
    //     console.log(">>> Check error: ", error);
    // }
    try {
        await db.User.destroy({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.log(">>> Check error: ", error);
    }
}
const getUpdateUser = async (id) => {
    // const connection = await mysql2.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });

    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM `user`WHERE id= ?', [id]);
    //     console.log(rows);
    //     return rows;
    // } catch (error) {
    //     console.log(">>> Check error: ", error);
    // }
    let user;
    try {
        user = await db.User.findOne({
            where: {
                id: id
            }
        });
        return user.get({
            plain: true
        });
    }
    catch (error) {
        console.log(">>> Check error: ", error);
    }
}
const updateUser = async function (userEmail, userName, userId) {
    // const connection = await mysql2.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE `user` SET `userEmail`=?,`userName`=? WHERE id = ? ', [userEmail, userName, userId]);

    //     return rows;
    // } catch (error) {
    //     console.log(">>> Check error: ", error);
    // }
    try {
        await db.User.update(
            {
                userEmail: userEmail,
                userName: userName,
            },
            {
                where: {
                    id: userId,
                }
            }
        )
    } catch (error) {
        console.log(">>> Check error: ", error);
    }
}
const getInfoStudentServices = async (IDKhoaHoc, SoBaoDanh = null, IDThiSinh = null) => {
    try {
        if (!IDKhoaHoc && !SoBaoDanh && !IDThiSinh ) {
            return ({
                EM: 'At least 1 field is not null',
                EC: -1,
                DT: [],
            });
        }

        let whereCondition = {};
        if (IDKhoaHoc) {
            whereCondition['IDKhoaHoc'] = IDKhoaHoc;
        }
        if (IDThiSinh) {
            whereCondition['IDThiSinh'] = IDThiSinh;
        }

        const khoahocThisinhInclude = {
            model: db.khoahoc_thisinh,
            include: [
                {
                    model: db.status,
                    attributes: ['id', 'namestatus'],
                },
                {
                    model: db.khoahoc,
                    attributes: null,
                },
            ],
        };
        if (SoBaoDanh) {
            khoahocThisinhInclude.where = { SoBaoDanh };
            khoahocThisinhInclude.required = true;
        }

        const thiSinhInfo = await db.thisinh.findAll({
            where: whereCondition,
            include: [
                khoahocThisinhInclude,
                {
                    model: db.processtest
                },
                {
                    model: db.exam,
                    include: [
                        {
                            model: db.test,
                            attributes: null,
                            include: [
                                {
                                    model: db.question,
                                    attributes: null,
                                    as: 'questions',
                                },
                            ],
                        },
                        {
                            model: db.subject, // Thêm bảng subject để lấy thông tin môn học
                            attributes: null, // Các thuộc tính cần lấy từ bảng subject
                        }
                    ],
                },
                {
                    model: db.rank,
                    include: [
                        {
                            model: db.subject,
                            where: { showsubject: true },
                            attributes: null
                        }
                    ]
                },
                {
                    model: db.khoahoc,
                }
            ],
            // order: [
            //     [db.khoahoc_thisinh, 'IDThiSinh', 'ASC']
            // ],
        });

        thiSinhInfo.forEach((thiSinh) => {
            if (thiSinh.exams) {
                thiSinh.exams = thiSinh.exams.sort((a, b) => a.IDSubject - b.IDSubject);
            }
        });

        return ({
            EM: 'Lấy thông tin thí sinh thành công',
            EC: 0,
            DT: thiSinhInfo,
        });

    } catch (error) {
        console.error("Lỗi khi truy vấn thông tin thí sinh:", error);
        return ({
            EM: 'Lỗi khi lấy thông tin thí sinh',
            EC: -1,
            DT: '',
        });
    }
};


module.exports = {
    createUserService,
    getUserList,
    deleteUser,
    getUpdateUser,
    updateUser,
    getInfoStudentServices
}