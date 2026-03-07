const { ComputerVisionClient } = require("@azure/cognitiveservices-computervision");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const fs = require("fs");
// Cấu hình Azure Computer Vision
const key = "A5YhQxiKVWjhpIyklfK914tpHdvwm7Xldh8nKQLMFNc99BThnGyGJQQJ99BAACqBBLyXJ3w3AAAFACOG1ua5"; // Thay bằng Key1 hoặc Key2
const endpoint = "https://khavydev.cognitiveservices.azure.com/"; // Thay bằng Endpoint

// Tạo textClient bằng API Key trực tiếp
const textClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
    endpoint
);
const formClient = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

const getGenerateImage = async (imagePath) => {
    try {
        const image = fs.readFileSync(imagePath);

        // Gửi ảnh đến Azure OCR để xử lý
        const result = await textClient.readInStream(image);

        const operationLocation = result.operationLocation;
        const operationId = operationLocation.split("/").slice(-1)[0];

        let readResult;
        while (true) {
            readResult = await textClient.getReadResult(operationId);
            if (readResult.status === "succeeded" || readResult.status === "failed") {
                break;
            }
        }

        if (readResult.status === "succeeded") {
            // Chuyển đổi kết quả thành văn bản chuỗi
            const extractedText = readResult.analyzeResult.readResults
                .flatMap((page) => page.lines.map((line) => line.text))
                .join("\n");

            const soRegex = /Só\s*[:.\s]*([\d]{2}\.[\d]+.*?)(?=\n)/i;
            const nhapNguRegex = /Nhâp ngu\s*:\s*(\d{2}\/\d{4})/;
            const ngayCapTheRegex = /Ngay cáp thé\s*:\s*(\d{2}\/\d{2}\/\d{4})/;

            const soMatch = extractedText.match(soRegex);
            const nhapNguMatch = extractedText.match(nhapNguRegex);
            const ngayCapTheMatch = extractedText.match(ngayCapTheRegex);
            const extractedInfo = {
                "Số": soMatch ? soMatch[1].replace(/[^a-zA-Z0-9/]/g, "") : "Không tìm thấy",
                "Nhập ngũ": nhapNguMatch ? nhapNguMatch[1] : "Không tìm thấy",
                "Ngày cấp thẻ": ngayCapTheMatch ? ngayCapTheMatch[1] : "Không tìm thấy",
            };

            return {
                EM: "Text extracted successfully",
                EC: 0,
                DT: {
                    extractedText,
                    extractedInfo,
                },
            };
        } else {
            return {
                EM: "Failed to analyze the image",
                EC: 1,
                DT: "",
            };
        }
    } catch (error) {
        console.error("Azure OCR error:", error.message);

        return {
            EM: "Error from Azure OCR",
            EC: -1,
            DT: "",
        };
    }
};

const getGenerateFormImage = async (imagePath) => {
    try {
        const image = fs.readFileSync(imagePath);
        console.log('check image', image)
        if (image) {
            const poller = await formClient.beginAnalyzeDocument("prebuilt-document", image);
            const result = await poller.pollUntilDone();

            if (!result) {
                return {
                    EM: "Failed to analyze the form",
                    EC: 1,
                    DT: "",
                };
            }

            // Chuyển kết quả sang JSON
            const extractedData = result.pages.map((page) => {
                const lines = page.lines.map((line) => line.content).join("\n");
                const tables = page.tables.map((table) =>
                    table.cells.map((cell) => ({
                        content: cell.content,
                        rowIndex: cell.rowIndex,
                        columnIndex: cell.columnIndex,
                    }))
                );

                return { lines, tables };
            });

            return {
                EM: "Form analyzed successfully",
                EC: 0,
                DT: extractedData,
            };
        }else{
            
            return {
                EM: "No file path",
                EC: 1,
                DT: [],
            };
        }

    } catch (error) {
        console.error("Azure Form Recognizer error:", error);

        return {
            EM: "Error from Azure Form Recognizer",
            EC: -1,
            DT: "",
        };
    }
};


module.exports = {
    getGenerateImage,
    getGenerateFormImage
};