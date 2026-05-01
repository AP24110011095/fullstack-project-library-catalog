const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const User = require("../models/User");
const Book = require("../models/Book");
const Borrow = require("../models/Borrow");

dotenv.config();

const sampleBooks = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    branch: "CSE",
    year: 3,
    description: "A practical guide for improving development skills.",
    quantity: 3,
    availabilityStatus: "Available"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    branch: "General",
    year: 2,
    description: "Build good habits and break bad ones using tiny improvements.",
    quantity: 4,
    availabilityStatus: "Available"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    branch: "CSE",
    year: 4,
    description: "A handbook of agile software craftsmanship.",
    quantity: 2,
    availabilityStatus: "Available"
  },
  {
    title: "Ikigai",
    author: "Hector Garcia",
    category: "Lifestyle",
    branch: "General",
    year: 1,
    description: "A Japanese concept for a purposeful and happy life.",
    quantity: 5,
    availabilityStatus: "Available"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    branch: "General",
    year: 2,
    description: "Rules for focused success in a distracted world.",
    quantity: 3,
    availabilityStatus: "Available"
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    branch: "CSE",
    year: 3,
    description: "Comprehensive guide to algorithms and data structures.",
    quantity: 2,
    availabilityStatus: "Available"
  },
  {
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    category: "Computer Science",
    branch: "CSE",
    year: 3,
    description: "Core concepts of modern operating systems.",
    quantity: 2,
    availabilityStatus: "Available"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    branch: "General",
    year: 1,
    description: "A philosophical novel about following your dreams.",
    quantity: 4,
    availabilityStatus: "Available"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    branch: "General",
    year: 2,
    description: "Personal finance lessons on assets and liabilities.",
    quantity: 3,
    availabilityStatus: "Available"
  },
  {
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    category: "Computer Science",
    branch: "CSE",
    year: 2,
    description: "Fundamentals of database design and transaction processing.",
    quantity: 2,
    availabilityStatus: "Available"
  },
  {
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    category: "Biography",
    branch: "General",
    year: 1,
    description: "Autobiography of Dr. A.P.J. Abdul Kalam.",
    quantity: 4,
    availabilityStatus: "Available"
  },
  {
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    category: "Computer Science",
    branch: "CSE",
    year: 3,
    description: "Detailed concepts of computer networking and protocols.",
    quantity: 2,
    availabilityStatus: "Available"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    branch: "General",
    year: 2,
    description: "Timeless lessons on wealth, greed, and happiness.",
    quantity: 3,
    availabilityStatus: "Available"
  }
];

const seedData = async () => {
  try {
    await connectDB();

    await Borrow.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create([
      {
        name: "Admin User",
        email: process.env.ADMIN_EMAIL || "admin@library.com",
        password: process.env.ADMIN_PASSWORD || "Admin@123",
        role: "admin"
      },
      {
        name: "Demo User",
        email: "user@library.com",
        password: "User@123",
        role: "user"
      }
    ]);

    const createdBooks = await Book.insertMany(sampleBooks);

    const demoUser = createdUsers.find((user) => user.role === "user");
    const borrowedBook = createdBooks[0];

    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + Number(process.env.BORROW_DAYS || 14));

    await Borrow.create({
      userId: demoUser._id,
      userName: demoUser.name,
      userEmail: demoUser.email,
      bookId: borrowedBook._id,
      bookTitle: borrowedBook.title,
      borrowDate,
      dueDate,
      status: "Borrowed"
    });

    borrowedBook.quantity = Math.max(0, (borrowedBook.quantity || 1) - 1);
    borrowedBook.availabilityStatus = borrowedBook.quantity > 0 ? "Available" : "Borrowed";
    await borrowedBook.save();

    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
