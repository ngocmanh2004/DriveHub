import { Telegraf, Markup } from "telegraf";
import dotenv from "dotenv";
import axios from "axios";
import { sendStatusUpdate } from '../websocket/wsStudentStatusServer.js';

dotenv.config();

const botTelegram = async () => {
  try {
    const botToken = process.env.BOT_TOKEN;
    const apiBaseUrl = process?.env?.API_BASE_URL || 'http://localhost:8080'; // e.g., http://localhost:8080
    let selectedCourseId = null;
    if (!botToken) {
      throw new Error("BOT_TOKEN is not defined in environment variables");
    }

    const bot = new Telegraf(botToken);
    console.log('Bot initialized:', bot);
    const helpMessage = `/coursenow\n/listcourses\n/changecourse\n
    /nhaplt ( ví dụ cú pháp /nhaplt 1,2,33,4,55,22)
    /nhapth ( ví dụ cú pháp /nhapth 1,2,33,4,55,22)
    /xoa ( xóa hàng đợi, cẩn thận, xóa luôn cả hàng đợi lý thuyết lẫn thực hành, nên dùng cho xóa thực hành ví dụ: cú pháp /xoa 1,2,33,4,55,22)
    `
    // Function to set the default course ID on startup
    const initializeDefaultCourse = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/course`);
        const courses = response.data.DT;

        if (courses && courses.length > 0) {
          selectedCourseId = courses[courses.length - 1].IDKhoaHoc; // Set latest course as default
          console.log(`Default selected course ID: ${selectedCourseId}`);
        } else {
          console.log("No courses available.");
        }
      } catch (error) {
        console.error("Error fetching courses:", JSON.stringify(error));
      }
    };

    // Initialize the default course ID at startup
    await initializeDefaultCourse();

    // Middleware to handle text input
    bot.on('text', async (ctx, next) => {
      const userInput = ctx.message.text.trim();
      console.log('check userInput', userInput);

      // Kiểm tra nếu người dùng nhập vào là số
      if (/^\d+$/.test(userInput)) {
        let queryParams = {};

        if (!selectedCourseId) {
          return ctx.reply("Khóa học chưa được chọn. Vui lòng chọn khóa học trước.");
        }
        // Nếu người dùng nhập từ 1 đến 3 chữ số, tìm kiếm theo SoBaoDanh (SBD)
        queryParams.IDKhoaHoc = selectedCourseId;
        // Nếu ngư

        // Nếu người dùng nhập từ 1 đến 3 chữ số, tìm kiếm theo SoBaoDanh (SBD)
        if (userInput.length <= 3) {
          queryParams.SoBaoDanh = userInput;
        }
        // Nếu người dùng nhập trên 4 chữ số, tìm kiếm theo CCCD
        else if (userInput.length > 3) {
          queryParams.CCCD = userInput;
        }
        console.log('check queryParams', queryParams)
        try {
          // Lấy thông tin thí sinh từ backend
          const response = await axios.get(`${apiBaseUrl}/api/students_SBD`, {
            params: queryParams,
          });

          const responseGetStu = await axios.get(`${apiBaseUrl}/api/students`, {
            params: queryParams,
          });

          // console.log('check responseGetStu', responseGetStu)

          // Duyệt hết các kết quả trả về
          const students = response.data.DT || [];
          if (students.length > 0) {
            for (const student of students) {
              // Thông tin thí sinh
              console.log('check student', student)
              const studentInfo = `\Số thứ tự: ${student.khoahoc_thisinh?.stt}\nSố Báo Danh: ${student.khoahoc_thisinh.SoBaoDanh}\nHọ Tên Thí Sinh: ${student.HoTen}\nCCCD: ${student.SoCMT}\nHọ Tên Thí Sinh: ${student.HoTen}\nTrạng Thái: ${student.khoahoc_thisinh?.status?.namestatus ? student.khoahoc_thisinh?.status?.namestatus : 'Chưa vào hàng đợi'}\nTrạng Thái Thanh Toán: ${student.khoahoc_thisinh?.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}\nTiền Thanh Toán: ${student.khoahoc_thisinh?.moneypayment ? `${student.khoahoc_thisinh?.moneypayment} VNĐ` : 'Chưa thanh toán'}`;

              // Gửi thông tin thí sinh và các nút tương tác
              await ctx.reply(studentInfo, Markup.inlineKeyboard([
                [
                  Markup.button.callback('Duyệt - Thi Lý Thuyết', `change_status_${student.khoahoc_thisinh.SoBaoDanh}_1`),
                  Markup.button.callback('Duyệt - Thi Thực Hành', `change_status_${student.khoahoc_thisinh.SoBaoDanh}_3`)
                ],
                [
                  Markup.button.callback('Xoá Khỏi Hàng Đợi', `change_status_${student.khoahoc_thisinh.SoBaoDanh}_null`)
                ]
              ]));
            }
          } else {
            await ctx.reply("Không có thông tin thí sinh.");
          }
        } catch (error) {
          console.error("Error fetching student info:", JSON.stringify(error));
          await ctx.reply("Failed to fetch student information.");
        }
      }

      return next(ctx);
    });


    // Handle button actions for updating student status
    bot.action(/change_status_(\d+)_(\d{1,})?/, async (ctx) => {
      const [_, sbd, status] = ctx.match; // Lấy SoBaoDanh và trạng thái từ regex

      try {
        console.log('chec status', _, sbd, status)
        if (!selectedCourseId) {
          return ctx.reply("Khóa học chưa được chọn. Vui lòng chọn khóa học trước.");
        }
        console.log('check selectedCourseId', selectedCourseId)
        // Convert the SoBaoDanh list into an array and remove any duplicates
        const soBaoDanhList = Array.from(new Set(sbd.split(",").map((s) => s.trim())));

        // Send the list of SoBaoDanh in a single POST request
        const response = await axios.post(`${apiBaseUrl}/api/students/status/bulk`, {
          IDKhoaHoc: selectedCourseId,
          SoBaoDanhList: soBaoDanhList, // Truyền danh sách vào đây
          status: !!status ? parseInt(status) : null, // Setting IDstatus to 1
        });

        if (response.data.EC === 0) {
          ctx.reply(`Đã thay đổi trạng thái số báo danh: ${soBaoDanhList.join(", ")}`);
        } else {
          ctx.reply(`Có lỗi xảy ra: ${response.data.EM}`);
        }
      } catch (error) {
        console.error("Error updating status:", JSON.stringify(error));
        ctx.reply("Không thể cập nhật trạng thái cho một số hoặc toàn bộ các mục.");
      }
    });

    // Command to show the current selected course ID
    bot.command('coursenow', async (ctx) => {
      if (selectedCourseId) {
        await ctx.reply(`Currently selected course ID: ${selectedCourseId}`);
      } else {
        await ctx.reply("No course is currently selected.");
      }
    });

    // Command to list all available course IDs
    bot.command('listcourses', async (ctx) => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/course`);
        const courses = response.data.DT;
        const courseIds = courses.map(course => course.IDKhoaHoc).join(', ');

        await initializeDefaultCourse();

        await ctx.reply(`Available course IDs: ${courseIds}`);
      } catch (error) {
        console.error("Error fetching courses:", error);
        await ctx.reply("Failed to retrieve course list.");
      }
    });

    // Command to change the selected course by ID
    bot.command('changecourse', async (ctx) => {
      const [command, newCourseId] = ctx.message.text.split(" ");
      console.log('check newCourseId', newCourseId)
      if (!newCourseId) {
        await ctx.reply("Please provide a valid course ID. Usage: /changecourse <course_id>");
        return;
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/api/course`);
        const courses = response.data.DT;
        const courseExists = courses.some(course => course.IDKhoaHoc === newCourseId);

        if (courseExists) {
          selectedCourseId = newCourseId;
          await ctx.reply(`Course ID changed to: ${selectedCourseId}`);
        } else {
          await ctx.reply("Course ID not found. Please choose a valid course ID.");
        }
      } catch (error) {
        console.error("Error changing course:", error);
        await ctx.reply("Failed to change course.");
      }
    });

    // /nhaplt command to update status of specific SoBaoDanh records
    bot.command("nhaplt", async (ctx) => {
      // Extract SoBaoDanh values from the message text
      const [, soBaoDanhListStr] = ctx.message.text.split(" ");
      if (!soBaoDanhListStr) {
        return ctx.reply("Vui lòng nhập đúng cú pháp, Ví dụ: /nhaplt 2,11,23,44");
      }

      // Convert the SoBaoDanh list into an array and remove any duplicates
      const soBaoDanhList = Array.from(new Set(soBaoDanhListStr.split(",").map((s) => s.trim())));

      // Ensure a course is selected
      if (!selectedCourseId) {
        return ctx.reply("Không lấy được khoá học");
      }

      try {
        // Send the list of SoBaoDanh in a single POST request
        const response = await axios.post(`${apiBaseUrl}/api/students/status/bulk`, {
          IDKhoaHoc: selectedCourseId,
          SoBaoDanhList: soBaoDanhList, // Truyền danh sách vào đây
          status: 1, // Setting IDstatus to 1
        });

        // Check if the backend operation was successful
        if (response.data.EC === 0) {
          ctx.reply(`Danh sách số báo danh đã chuyển vào hàng đợi: ${soBaoDanhList.join(", ")}`);
        } else {
          ctx.reply(`Có lỗi xảy ra: ${response.data.EM}`);
        }
      } catch (error) {
        console.error("Error updating status:", JSON.stringify(error));
        ctx.reply("Không thể cập nhật trạng thái cho một số hoặc toàn bộ các mục.");
      }
    });

    bot.command("xoa", async (ctx) => {
      // Extract SoBaoDanh values from the message text
      const [, soBaoDanhListStr] = ctx.message.text.split(" ");
      if (!soBaoDanhListStr) {
        return ctx.reply("Vui lòng nhập đúng cú pháp, Ví dụ: /xoalt 2,11,23,44");
      }

      // Convert the SoBaoDanh list into an array and remove any duplicates
      const soBaoDanhList = Array.from(new Set(soBaoDanhListStr.split(",").map((s) => s.trim())));

      // Ensure a course is selected
      if (!selectedCourseId) {
        return ctx.reply("Không lấy được khoá học");
      }

      try {
        // Send the list of SoBaoDanh in a single POST request
        const response = await axios.post(`${apiBaseUrl}/api/students/status/bulk`, {
          IDKhoaHoc: selectedCourseId,
          SoBaoDanhList: soBaoDanhList, // Truyền danh sách vào đây
          status: null // Setting IDstatus to 1
        });

        // Check if the backend operation was successful
        if (response.data.EC === 0) {
          ctx.reply(`Danh sách số báo danh đã chuyển vào hàng đợi: ${soBaoDanhList.join(", ")}`);
        } else {
          ctx.reply(`Có lỗi xảy ra: ${response.data.EM}`);
        }
      } catch (error) {
        console.error("Error updating status:", JSON.stringify(error));
        ctx.reply("Không thể cập nhật trạng thái cho một số hoặc toàn bộ các mục.");
      }
    });


    // /nhapLT command to update status of specific SoBaoDanh records
    bot.command("nhapth", async (ctx) => {
      // Extract SoBaoDanh values from the message text
      const [, soBaoDanhListStr] = ctx.message.text.split(" ");
      if (!soBaoDanhListStr) {
        return ctx.reply("Vui lòng nhập đúng cú pháp, Ví dụ: /nhaplt 2,11,23,44");
      }

      // Convert the SoBaoDanh list into an array and remove any duplicates
      const soBaoDanhList = Array.from(new Set(soBaoDanhListStr.split(",").map((s) => s.trim())));

      // Ensure a course is selected
      if (!selectedCourseId) {
        return ctx.reply("Không lấy được khoá học");
      }

      try {
        // Send the list of SoBaoDanh in a single POST request
        const response = await axios.post(`${apiBaseUrl}/api/students/status/bulk`, {
          IDKhoaHoc: selectedCourseId,
          SoBaoDanhList: soBaoDanhList, // Truyền danh sách vào đây
          status: 3, // Setting IDstatus to 1
        });

        // Check if the backend operation was successful
        if (response.data.EC === 0) {
          ctx.reply(`Danh sách số báo danh đã chuyển vào hàng đợi: ${soBaoDanhList.join(", ")}`);
        } else {
          ctx.reply(`Có lỗi xảy ra: ${response.data.EM}`);
        }
      } catch (error) {
        console.error("Error updating status:", JSON.stringify(error));
        ctx.reply("Không thể cập nhật trạng thái cho một số hoặc toàn bộ các mục.");
      }
    });

    // Command to list all available course IDs
    bot.command('help', async (ctx) => {
      try {

        await ctx.reply(helpMessage);
      } catch (error) {
        console.error("Error fetching courses:", error);
        await ctx.reply("Failed to retrieve course list.");
      }
    });



    bot.launch();

    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
  } catch (error) {
    console.error("Error initializing bot:", error);
  }
};

export default botTelegram;
