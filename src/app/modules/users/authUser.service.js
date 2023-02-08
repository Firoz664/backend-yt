const userModel = require('./user.model')
const logger = require('../../common/logger/logs');
const bcrypt = require('bcrypt');
const { generateToken, verifyToken, getToken } = require("../../common/helpers/utils/jwt");




exports.dologinUser = async (emailPhone, password) => {
    try {
        if (!emailPhone || !password){
            return {
                status: false,
                data: "Username or password missing"
            }
        }
        const getUser = await userModel.findOne({
            $or: [{
                "email": emailPhone.toLowerCase()
            }, {
                "mobileNumber": emailPhone.toLowerCase()
            }]
        });
        if (!getUser) {
            return {
                status: false,
                errorType: "NOTFOUND",
                data: "User not found"
            }
        }
        if (await bcrypt.compare(password, getUser.password)) {
            const token = await generateToken({
                _id: getUser._id,
                email: getUser.email,
                mobileNumber: getUser.mobileNumber
            });
            return {
                status: true,
                message: "Login successful",
                accessToken: token,
                userData: getUser
            }
        } else {
            return {
                status: false,
                data: "Invalid credential"
            }
        }
    } catch (error) {
        logger.error("/modules/user/user.services.js:", " dologinUser ", error);
        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            }
        } else {
            console.log(JSON.stringify(error))
            return {
                status: false,
                message: "Error while login user, Try after some time!"
            }
        }
    }
}

exports.doResetPassword = async (validatedBody) => {
    try {
        const { emailPhone, newPassword } = validatedBody;
        const getUser = await userModel.findOne({
            $or: [{ email: emailPhone }, { mobileNumber: emailPhone }],

        });
        if (!getUser) {
            return {
                status: false,
                data: "User is not registered."
            }
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(newPassword, salt)
            var updateResult = await userModel.findByIdAndUpdate({ _id: getUser._id }, { password: hashPassword }, { new: true })
            return {
                status: true,
                message: "Password reset successfully."
            }
        }
    } catch (error) {
        logger.error("/modules/user/user.services.js:", " doResetPassword ", error);
        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            }
        } else {
            console.log(JSON.stringify(error))
            return {
                status: false,
                message: "Error while user resetpassword , Try after some time!"
            }
        }
    }
}

exports.doChangePassword = async (validatedBody, userId) => {
    try {
        const { oldPassword, newPassword } = validatedBody;
        const userExits = await userModel.findOne({ _id: userId });
        if (!userExits) {
            return {
                status: false,
                data: "User not found."
            }
        } else {
            var check = bcrypt.compareSync(oldPassword, userExits.password);
            if (!check) {
                return {
                    status: false,
                    data: "Incorrect old password."
                }
            } else {
                const salt = await bcrypt.genSalt(10)
                var check2 = bcrypt.compareSync(newPassword, userExits.password);
                if (check2) {
                    return {
                        status: false,
                        data: "New password cannot be old password"
                    }
                }
                const hashPassword = await bcrypt.hash(newPassword, salt)
                var updateResult = await userModel.findByIdAndUpdate({ _id: userExits._id }, { password: hashPassword }, { new: true })
                return {
                    status: true,
                    message: "Password changed successfully."
                }
            }
        }
    } catch (error) {
        logger.error("/modules/user/user.services.js:", " doChangePassword ", error);
        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            }
        } else {
            console.log(JSON.stringify(error))
            return {
                status: false,
                message: "Error while user changed his password, Try after some time!"
            }
        }
    }
}

exports.doGoogleLogin = async (validatedBody) => {
    try {
        const { isGoogleLogin, email } = validatedBody;
        const userInfo = await userModel.findOne({$and: [{ email: email },{ authType: "GOOGLE" },{ userStatus: { $ne: false } },],});
        if (isLinkdInLogin === false) {
            if (userInfo) {
                return {
                    status: false,
                    data: {
                        message: "User already exist !",
                    },
                };
            }
            return {
                status: true,
                data: {
                    message: "Registered successfully",
                },
            };
        } else {
            if (userInfo) {
                const token = await generateToken({
                    _id: userInfo._id,
                    email: userInfo.email,
                });
                return {
                    status: true,
                    data: {
                        message: "Login successful",
                        accessToken: token,
                        userData: userInfo
                    },
                };
            } else {
                return {
                    status: false,
                    data: "User not found.",
                };
            }
        }
    } catch (error) {
        logger.error("/modules/user/user.services.js:", " doResetPassword ", error);
        if (error.code === 11000) {
            return {
                status: false,
                errorType: "MongoDB",
            };
        } else {
            console.log(JSON.stringify(error));
            return {
                status: false,
                message: "Error while social login of user, Try after some time!",
            };
        }
    }
};


