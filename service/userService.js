import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Users } from "../models/schema/user.js";

export async function createUserService(data, res) {

  const existingUser= await Users.findOne({
    where: { email: data.email },
  });

  if (existingUser) {
    sendErrResponseByMsg(
      res,
      "User with same email already exists",
      HttpStatus.CONFLICT
    );
  }

  const savedUser = await Users.create(data);

  return savedUser;
}

export async function getSpecifiedUserService(id) {
  return Users.findByPk(id);
}

export function getAllUserService({
  find = {},
  sort = "createdAt",
  limit = "",
  skip = "",
  select = ""
}) {
  const queryOptions = {
    attributes: select,
    where: find,
  };

  if (sort) {
    queryOptions.order = [[sort]];
  }

  if (limit) {
    queryOptions.limit = parseInt(limit);
  }

  if (skip) {
    queryOptions.offset = parseInt(skip);
  }

  return Users.findAll(queryOptions);
}

export async function updateUserService({ id, data }) {
  const [_, [updatedUser]] = await Users.update(data, {
    where: { id },
    returning: true,
  });

  return updatedUser;
}

export async function deleteUserService(id) {

  const recordToDelete = await Users.findByPk(id);

  if (!recordToDelete) {
    return { success: false, message: "User not found" };
  }

  const deletedRows = await Users.destroy({
    where: { id },
  });

  return deletedRows;
}