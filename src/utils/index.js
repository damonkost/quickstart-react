export const isPublicKeyMissingError = ({ vapiError }) => {
    console.log("index.js is loaded");
    return !!vapiError && vapiError.error.statusCode === 403 && vapiError.error.error === "Forbidden";
};