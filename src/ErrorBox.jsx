
// eslint-disable-next-line react/prop-types
const ErrorBox = ({ error = '' }) => {
    return error.length > 0 ? <div className="p-3 border text-left text-sm border-red-600 rounded text-red-600">{error}</div> : null;
};
export default ErrorBox;