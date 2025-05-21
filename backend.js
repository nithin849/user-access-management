require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createConnection } = require('typeorm');
const { SlackService } = require('./slack-integration');
const { LLMService } = require('./llm-integration');

const app = express();
app.use(express.json());

// Database Entities
class User {
  constructor() {
    this.id = 0;
    this.username = '';
    this.password = '';
    this.role = 'Employee';
  }
}

class Software {
  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.accessLevels = [];
  }
}

class Request {
  constructor() {
    this.id = 0;
    this.user = new User();
    this.software = new Software();
    this.accessType = 'Read';
    this.reason = '';
    this.status = 'Pending';
  }
}

// Database Connection
async function connectDB() {
  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Software, Request],
    synchronize: true,
  });
  console.log("Database connected");
}

// Auth Middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Authentication required" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

function authorize(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
}

// Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Start Server
async function start() {
  await connectDB();
  app.listen(5000, () => console.log('Server running on port 5000'));
}

start();
