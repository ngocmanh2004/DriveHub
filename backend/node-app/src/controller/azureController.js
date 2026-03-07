import azureService from "../service/azureService.js";

const getGenerateImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        EM: "No image provided", // Thông báo lỗi
        EC: 1,
        DT: "",
      });
    }

    // Gọi service để xử lý hình ảnh
    const data = await azureService.getGenerateImage(req.file.path);

    return res.status(200).json({
      EM: data.EM, // Error message
      EC: data.EC, // Error code
      DT: data.DT, // Dữ liệu trích xuất
    });
  } catch (e) {
    console.error("check error: ", e);
    return res.status(500).json({
      EM: "Error from server", // Error message
      EC: -1, // Error code
      DT: "",
    });
  }
};


const getGenerateFormImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          EM: "No image provided", // Thông báo lỗi
          EC: 1,
          DT: "",
        });
      }
  
      // Gọi service để xử lý hình ảnh
      const data = await azureService.getGenerateFormImage(req.file.path);
  
      return res.status(200).json({
        EM: data.EM, // Error message
        EC: data.EC, // Error code
        DT: data.DT, // Dữ liệu trích xuất
      });
    } catch (e) {
      console.error("check error: ", e);
      return res.status(500).json({
        EM: "Error from server", // Error message
        EC: -1, // Error code
        DT: "",
      });
    }
  };

export default {
  getGenerateImage,
  getGenerateFormImage
};
