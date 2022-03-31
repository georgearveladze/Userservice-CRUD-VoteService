module.exports = async (req, res, next) => {
  try {
    const ifUnmodifiedSince = req.headers['if-unmodified-since']

    if (ifUnmodifiedSince && new Date(ifUnmodifiedSince) <= user.updated_at) {
      return res
        .status(304)
        .send({ message: 'Requested resource has not been modified' })
    }
    next()
  } catch {
    return res.status(500).send({ message: 'user modifided problem' })
  }
}
