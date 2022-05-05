import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const SignUpSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Name must be at least 2 characters long",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Not a valid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(4).required().messages({
    "string.min": "Password must be at least 4 characters long",
    "any.required": "Password is required",
  }),
});

export const validateSignUpBody = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const { error } = SignUpSchema.validate(data);
  if (error) return res.status(422).send(error.details[0]);

  next();
};

const SignInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Not a valid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(4).required().messages({
    "string.min": "Password must be at least 4 characters long",
    "any.required": "Password is required",
  }),
});

export const validateSignInBody = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const { error } = SignInSchema.validate(data);
  if (error) return res.status(422).send(error.details[0]);

  next();
};
