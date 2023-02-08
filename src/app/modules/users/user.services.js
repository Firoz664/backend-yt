const userModel = require("./user.model");
const logger = require("../../common/logger/logs");
const {
  generateToken,
  verifyToken,
  getToken,
} = require("../../common/helpers/utils/jwt");
const jwt = require("jsonwebtoken");

exports.doCreateUser = async (data) => {
  try {
    let userPayload = data;
    let userExist = userPayload.email
      ? userPayload.email
      : userPayload.mobileNumber;
    let userResult = await userModel.findOne({
      $or: [{ email: userExist }, { mobileNumber: userExist }],
    });
    if (userResult) {
      return {
        status: false,
        data: {
          message: "Your Already Created  Please Login ",
        },
      };
    }
    const result = await userModel.create(userPayload);
    const token = await generateToken({
      _id: result._id,
    });
    logger.info(
      "/modules/auth/user.services.js:",
      " doCreate sale Data ",
      result
    );
    if (result) {
      return {
        status: true,
        data: {
          message: "User Created Successfully",
          token: token,
        },
      };
    } else {
      return {
        status: false,
        data: "Error while creating user",
      };
    }
  } catch (error) {
    logger.error("/modules/user/user.services.js:", " doCreateuser ", error);
    if (error.code === 11000) {
      return {
        status: false,
        errorType: "MongoDB",
      };
    } else {
      console.log(JSON.stringify(error));
      return {
        status: false,
        message: "Error while creating user, Try after some time!",
      };
    }
  }
};
exports.getUserDetails = async (data) => {
  try {
    const getUser = await userModel.findOne({ _id: data }).select("-password");
    if (getUser) {
      return {
        status: true,
        data: {
          message: "User Details",
          getUser: getUser,
        },
      };
    } else {
      return {
        status: false,
        message: "User Not found",
      };
    }
  } catch (error) {
    logger.error("/modules/user/user.services.js:", " getUserDetails ", error);
    if (error.code === 11000) {
      return {
        status: false,
        errorType: "MongoDB",
      };
    } else {
      console.log(JSON.stringify(error));
      return {
        status: false,
        message: "Error while get user with accounts, Try after some time!",
      };
    }
  }
};
exports.doGetAllUser = async (data) => {
  try {
    let result = await userModel.aggregate([
        { 
            $project: {
                _id:0,
                email:1, 
                item: 1, 
                date:"$dateOfBirth", 
                age: { 
                    $let:{
                        vars:{
                            diff: { 
                                $subtract: [ new Date(), "$dateOfBirth" ] 
                            }
                        },
                        in: {
                            $divide: ["$$diff", (365 * 24*60*60*1000)]
                        }
                    }
                } 
             }  
        },
    //   {
    //     $project: {
    //       _id: 0,
    //       email: 1,
    //       birthDate:{$convert:{input:"$dateOfBirth", to:"date"}},
    //       location: {
    //         type: "Point",
    //         coordinates: [
    //           {
    //             $convert: {
    //               input: "$loacation.coordinates.latitude",
    //               to: "double",
    //               onError: 0.0,
    //               onNull: 0.0,
    //             },
    //           },
    //           {
    //             $convert: {
    //               input: "$loacation.coordinates.longitude",
    //               to: "double",
    //               onError: 0.0,
    //               onNull: 0.0,
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   },
    //     {
    //       $project: {
    //         _id: 0,
    //         gender: 1,
    //         _id: 0,
    //       email: 1,
    //       date:1,
    //       age:1,
    //       birthDate:1,
    //       location:1,
    //         // firstName:{$concat:[{$toUpper:"$firstName"}, use for all name upper case
    //         FullName: {
    //           $concat: [
    //             { $toUpper: { $substrCP: ["$firstName", 0, 1] } },
    //             {
    //               $substrCP: [
    //                 "$firstName",
    //                 1,
    //                 { $subtract: [{ $strLenCP: "firstName" }, 1] },
    //               ],
    //             },
    //             " ",
    //             { $toUpper: { $substrCP: ["$lastName", 0, 1] } },
    //             {
    //               $substrCP: [
    //                 "$lastName",
    //                 1,
    //                 { $subtract: [{ $strLenCP: "lastName" }, 1] },
    //               ],
    //             },
    //           ],
    //         },
    //       },
    //     },
    ]);
    logger.info("/modules/user/user.services.js:", " doGetAllusers ", result);
    if (result) {
      return {
        status: true,
        result: result,
      };
    } else {
      return {
        status: false,
        data: "Error while getting all users",
      };
    }
  } catch (error) {
    logger.error("/modules/user/user.services.js:", " doGetAllusers ", error);

    if (error.code === 11000) {
      return {
        status: false,
        errorType: "MongoDB",
      };
    } else {
      console.log(JSON.stringify(error));
      return {
        status: false,
        message: "Error while getting users, Try after some time!",
      };
    }
  }
};
exports.doDeleteUser = async (userId) => {
  try {
    let result = await userModel.findByIdAndDelete(
      { _id: userId },
      { new: true }
    );
    logger.info("/modules/user/user.services.js:", " doDeleteUser ", result);
    if (result) {
      return {
        status: true,
        message: "User deleted Successfully",
      };
    } else {
      return {
        status: false,
        data: "Error while deleting  user",
      };
    }
  } catch (error) {
    logger.error("/modules/user/user.services.js:", " doDeleteStudent ", error);
    if (error.code === 11000) {
      return {
        status: false,
        errorType: "MongoDB",
      };
    } else {
      console.log(JSON.stringify(error));
      return {
        status: false,
        message: "Error while deleting user, Try after some time!",
      };
    }
  }
};
exports.doUpdateUser = async (data, id) => {
  try {
    let user = data;
    let result = await userModel.findByIdAndUpdate(
      { _id: id.userId },
      { $set: user },
      { new: true }
    );
    logger.info("/modules/user/user.services.js:", " doUpdateUser ", result);
    if (result) {
      return {
        status: true,
        message: "User updated Successfully",
        data: result,
      };
    } else {
      return {
        status: false,
        data: "Error while updating User",
      };
    }
  } catch (error) {
    logger.error("/modules/user/user.services.js:", " doUpdateUser ", error);
    if (error.code === 11000) {
      return {
        status: false,
        errorType: "MongoDB",
      };
    } else {
      console.log(JSON.stringify(error));
      return {
        status: false,
        message: "Error while updating user, Try after some time!",
      };
    }
  }
};

exports.getAllCampaignByBrandId = async (userId, validatedBody) => {
  try {
    let checkUser = await userModel.find();
    if (checkUser) {
      return {
        status: true,
        data: "User user data fetch",
      };
    } else {
      let query = {
        creatorId: checkUser._id,
        campaignStatus: { $ne: "DELETE" },
      };
      const { search, filterBy, page, limit } = validatedBody;
      if (search) {
        query.$or = [
          { campaignName: { $regex: search, $options: "i" } },
          { brandName: { $regex: search, $options: "i" } },
        ];
      }
      if (filterBy == "DAILY") {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        query.createdAt = { $gte: new Date(today) };
      }
      if (filterBy == "WEEKLY") {
        let time = new Date(
          new Date().setDate(new Date().getDate() - 7)
        ).toISOString();
        query.createdAt = { $gte: new Date(time) };
      }
      if (filterBy == "MONTHLY") {
        let time = new Date(
          new Date().setDate(new Date().getDate() - 30)
        ).toISOString();
        query.createdAt = { $gte: new Date(time) };
      }
      if (filterBy == "MONTHLY") {
        let time = new Date(
          new Date().setDate(new Date().getDate() - 60)
        ).toISOString();
        query.createdAt = { $gte: new Date(time) };
      }
      if (filterBy == "MONTHLY") {
        let time = new Date(
          new Date().setDate(new Date().getDate() - 90)
        ).toISOString();
        query.createdAt = { $gte: new Date(time) };
      }
      if (filterBy == "MONTHLY") {
        let time = new Date(
          new Date().setDate(new Date().getDate() - 180)
        ).toISOString();
        query.createdAt = { $gte: new Date(time) };
      }
      if (filterBy == "YEARLY") {
        let time = new Date(
          new Date().setDate(new Date().getDate() - 364)
        ).toISOString();
        query.createdAt = { $gte: new Date(time) };
      }
      let options = {
        page: page || 1,
        limit: limit || 15,
        sort: { createdAt: -1 },
      };
      let result = await campaignModel.paginate(query, options);
      logger.info(
        "/modules/campaigns/campaigns.services.js:",
        " getAllCampaignByBrandId ",
        result
      );
      if (result) {
        return {
          status: true,
          data: {
            message: "Data found Successfully",
            result: result,
          },
        };
      }
    }
  } catch (error) {
    logger.error(
      "/modules/campaigns/campaigns.services.js:",
      " getAllCampaignByBrandId ",
      error
    );
    if (error.code === 11000) {
      return {
        status: false,
        errorType: "MongoDB",
      };
    } else {
      console.log(JSON.stringify(error));
      return {
        status: false,
        message:
          "Error while getting campaigns of particuler brand, Try after some time!",
      };
    }
  }
};
