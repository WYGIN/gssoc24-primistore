import mongoose from "mongoose";
import primistoreModel from "./primistore-model.js";
import { IPassword } from "./primistore-schema.js"

export const createPassword = (pass_uid: string, aes_key: string, aes_iv: string): Promise<mongoose.Document | any> => {
  let currentTime = Math.floor(Date.now() / 1000).toString();

  const query = { pass_uid };
  const update = {
    $setOnInsert: {
      pass_uid,
      aes_key,
      aes_iv,
      aes_last_rotated: currentTime,
      charset_last_rotated: currentTime,
    },
  };

  const options = { upsert: true };
  return primistoreModel.findOneAndUpdate(query, update, options);
};

export const getPasswords = (): Promise<Document[]> => {
  return primistoreModel.find();
};

export const updatePasswordAES = (pass_uid: string, aes_key: string, aes_iv: string): Promise<mongoose.Document | null> => {
  const query = { pass_uid };
  const options = { new: true };
  const currentTime = Math.floor(Date.now() / 1000).toString();

  const update = {
    $set: {
      aes_key: aes_key,
      aes_iv: aes_iv,
      aes_last_rotated: currentTime,
    },
  };

  return primistoreModel.findOneAndUpdate(query, update, options);
};

export const updatePasswordCharset = (pass_uid: string): Promise<mongoose.Document | null> => {
  const query = { pass_uid };
  const options = { new: true };
  const currentTime = Math.floor(Date.now() / 1000).toString();

  const update = {
    $set: {
      charset_last_rotated: currentTime,
    },
  };

  return primistoreModel.findOneAndUpdate(query, update, options);
};

export const getPasswordByPassUid = (pass_uid: string): Promise<IPassword> => {
  return primistoreModel.findOne({ pass_uid: pass_uid });
};

export const removePasswordByPassUid = (pass_uid: string): Promise<any> => {
  return primistoreModel.deleteOne({ pass_uid: pass_uid });
};