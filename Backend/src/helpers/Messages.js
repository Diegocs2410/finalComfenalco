const message = {};
message.messageGeneral = (res, statuscode, status, data, message) => {
  return res.status(statuscode).json({
    ok: status,
    data,
    message,
  });
};

module.exports = message;
