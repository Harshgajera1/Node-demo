import express, { Request, Response } from "express";
import axios from "axios";
import UserModel from "./Model/User.js";
const route = express.Router();

route.post("/api/users/signup", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Create a new user
    const newUser = new UserModel({ username, email, password });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.post("/api/users/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.post("/api/users/me", async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.body._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.get("/api/random-joke", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    return res.send(response.data);
  } catch (error) {
    console.error("Error fetching :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

route.post('/api/users/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'Logout successful' });
  });
});

export default route;
