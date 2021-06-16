const response = (success, message = '', data) => {
  const result = {};

  if (typeof (success) === 'boolean') {
    result.success = success;
  }
  if (message) {
    result.message = message;
  }
  return {
    ...result,
    ...data
  };
};

module.exports = { response };
