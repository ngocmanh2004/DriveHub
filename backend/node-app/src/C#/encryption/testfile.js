const { execFile } = require('child_process');
const path = require('path');

// Đường dẫn đến file .exe
const exePath = path.resolve(__dirname, 'encryption/encryptionTestPractice.exe');
function runEncryptionUtility(mode, input) {
    console.log('check exePath', exePath)
    return new Promise((resolve, reject) => {
        execFile(exePath, [mode, input], (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

(async () => {
    try {
        const encrypted = await runEncryptionUtility("encrypt", "TkdVWeG7hE4gVsWo");
        console.log("Encrypted:", encrypted);

        const decrypted = await runEncryptionUtility("decrypt", "TkdVWeG7hE4gVsWo");
        console.log("Decrypted:", decrypted);
    } catch (error) {
        console.error("Error:", error);
    }
})();
