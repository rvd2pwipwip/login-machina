// error code 1 - no account
// error code 2 - wrong password
// error code 3 - no response

// const isSuccess = () => Math.random() >= 0.8;
const isSuccess = () => 1;
// const generateErrCode = () => Math.floor(Math.random() * 3) + 1;
const generateErrCode = () => 1;

const contactAuthService = (email, password) =>
  new Promise((resolve, reject) => {
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);
    setTimeout(() => {
      if (isSuccess()) resolve();
      reject({ code: generateErrCode() });
    }, 1500);
  });

export default contactAuthService;
