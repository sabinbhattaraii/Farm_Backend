import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { TokenDatas } from "../models/token.js";
import { throwError } from "../utils/throwError.js";

export async function createTokenService(data, res) {
  try{
    const exisitngToken = await TokenDatas.findOne({
      where: { token: data.token },
    });
    
    if (exisitngToken) {
      sendErrResponseByMsg(
        res,
        "TokenData with same token exists",
        HttpStatus.CONFLICT
        );
      }
    
      const savedToken = await TokenDatas.create(data);
      
      return savedToken;
    } catch (error) {
      console.error("Error Creating Token:",error);
      throw throwError({
            statusCode : HttpStatus.BAD_REQUEST,
            message : "Server Error",
          });
        }
      }

export async function deleteSpecifiedTokenService(id) {
  try {
    // Find the record that you're about to delete
    const recordToDelete = await TokenDatas.findByPk(id);

    if (!recordToDelete) {
      // Record with the provided ID not found
      return { success: HttpStatus.CONFLICT, message: "Record not found" };
    }

    // Delete the record
    await TokenDatas.destroy({
      where: { id },
    });

    return { success: HttpStatus.OK, message: "Record deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: HttpStatus.BAD_REQUEST, message: "Error deleting record" };
  }
}

export async function deleteAllTokenUser(userId) {
  try {
    //delete the record
    const deletedRows = await TokenDatas.destroy({
      where: { userId },
    });
    return deletedRows;
  } catch (error){
    console.error("Error Deleting Token:",error);
    throw throwError({
      statusCode : HttpStatus.BAD_REQUEST,
      message : "Server Error",
    });
  }
}