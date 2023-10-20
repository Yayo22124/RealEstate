// ! Token ID
const generateID = () => Date.now().toString(32) + Math.random().toString(32).substring(3)

export {
    generateID
};
