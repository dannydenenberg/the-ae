export const sendVerificationCodeEmail = (_id, code) => {
  // send user a link like this: `/verify?q=<CODE_HERE>`
  // send email code here
  console.log("sending email with code:", `/verify?_id=${_id}&code=${code}...`);
};
