async function urlExistNodeJS(url) {
  const req = await fetch(url);
  return req.status === 200;
}

module.exports = urlExistNodeJS;
