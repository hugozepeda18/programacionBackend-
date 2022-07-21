const session = {
    cookie: "1234567890"
  }

const cookieAuth = () => {
  return (req, res, next) => {
    let cookie = req.headers.cookie ?? null;
    if (cookie != session.cookie) {
        return res.status(401).send('El servidor requiere autenticación')
    } else {
      next()
    }

  }
}

export default cookieAuth