export const signup = async (req, res, next) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
  } catch (error) {
    next(error);
  }
};
export const login = (req, res) => {
  console.log("login user");
};
export const logout = (req, res) => {
  console.log("login user");
};
