import { Handler } from "express";
import random from 'random';
const hash = require('../utils/hash');

const nodemailer = require("nodemailer");

const db = require('../../models');
const { PASS, USER } = require('../config.ts');

export const forgotPass: Handler = async (request, response) => {
  const { email } = request.body;
  try {
    const signInUser = await db.User.findOne({ where: { email } });
    let i = 0;
    let confirmNumber;
    while (i === 0) {
      confirmNumber = random.int(100600, 900400);
      
      const signInUser = await db.User.findOne({ where: { changePass: confirmNumber.toString() } });
      console.log(signInUser);
      if (!signInUser) {
        i = 1;
      }
    }
    try {
      const updatedUser = await db.User.update(
        { changePass: confirmNumber },
        { where: { email } },
      );
    } catch (err) {
      return response
        .status(403)
        .json({
          message: 'Ошибка обновления временных данных'
        });
    }

    let transport = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      auth: {
        user: USER,
        pass: PASS,
      },
    });
    const mailOption = {
      from: USER,
      to: USER,
      subject: "Comfirm pass",
      text: confirmNumber.toString(),
    }
    
    transport.sendMail(mailOption, (err: any, success: any) => {
      if (err) {
        return response.status(500);
      } else {
          console.log("SendMail: Ok");
        }
    });
    return response.status(200);
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Ошибка проверки ввода'});
  }
};

export const confirmEmail: Handler = async (request, response) => {
  const { secret } = request.body;
  console.log(secret);
  
  try {
    const signInUser = await db.User.findOne({ where: { changePass: secret } });
    console.log(signInUser);
  return response.status(200).json({
    email: signInUser.email,
  });
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Данные не прошли проверку'});
  }
};

export const confirmPass: Handler = async (request, response) => {
  const { password, secret } = request.body;
  try {
    const hasPassword = hash(password);
    const updatedUser = await db.User.update(
      { password: hasPassword },
      { where: { changePass: secret } },
    );
    return response.status(200).json({
      result: updatedUser,
    });
  } catch (err) {
    return response
      .status(403)
      .json({ message: 'Ошибка обновления данных пользователя'});
  }
};
