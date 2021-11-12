const Users = require("../model/model");

const validateCredentials = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next({ status: 401, message: "username and password required" });
    }
    const [user] = await Users.findBy({ username });
    if (user) {
      next({ status: 401, message: "username taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkLoginCredentials = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next({ status: 401, message: "username and password required" });
    }

    const user = await Users.findBy(req.body.username);
    if (!user) {
      next({ status: 402, message: "invalid credentials" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCredentials,
  checkLoginCredentials,
};
