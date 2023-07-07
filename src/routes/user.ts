import { Request, Response, Application } from "express";
import { User, SignUp } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { verifyAuthToken } from "../middleware/auth";
