function resSuccessWrite(res, status, data) {
  res.status(status).json({
    status,
    data,
  });
}

function resFaildWrite(res, status, message) {
  res.status(status).json({
    status,
    message,
  });
}

module.exports = { resSuccessWrite, resFaildWrite };
