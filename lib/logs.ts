// console.js
const noop = () => undefined;

export default process.env.NODE_ENV === "production" ||
    process.env.REACT_APP_ENV === "STAGING"
    ? Object.fromEntries(Object.keys(console).map(key => [key, noop]))
    : console;