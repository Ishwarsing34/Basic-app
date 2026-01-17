const bcrypt = require('bcrypt');
const { UserModel } = require('../models/user-model')
const { ToDoModel } = require("../models/todos-model")
const generateToken = require("../utils/TokenGenerator")

const signUp = async (req, res) => {



    try {

        const { name, email, password } = req.body;


        const user = await UserModel.findOne({
            email
        })


        if (user) {
            return res.status(400).json({
                message: "user already exist with this email"
            })
        }


        const hash = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            email,
            password: hash
        })

        delete newUser._doc.password

        res.status(200).json({
            message: "You have Signed Up Successfully",
            newUser
        })




    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }

}

const signIn = async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            }
            )
        }

        const user = await UserModel.findOne({
            email
        })



        if (!user) {

            res.status(401).json({
                message: "Invalid Email or Password"
            })
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Email or Pasword"
            })
        }

        const token = generateToken(user._id);


        res.cookie("token", token);

        delete user._doc.password;

        res.status(200).json({
            message: "LogIn Successfull",
            token,
            user
        })




    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}


const createTodo = async (req, res) => {



    try {


        const { title, description, priority } = req.body;

        if (!title) {
            return res.json(400).json({
                message: "Title is Required"
            })
        }

        const todo = await ToDoModel.create({
            title,
            description,
            priority,
            userId: req.user._id
        })


        res.status(200).json({
            messgae: "ToDO Created Sucessfully",
            todo
        })

    } catch (error) {

        res.status(401).json({
            messgae: error.message
        })
    }
}


const dltTodo = async (req, res) => {
  try {
    const todoId = req.params.id; // ✅ string

    // ✅ FIX 1: pass ID directly
    const todo = await ToDoModel.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        message: "TODO not found"
      });
    }

    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this todo"
      });
    }

    // ✅ FIX 2: pass ID directly
    await ToDoModel.findByIdAndDelete(todoId);

    return res.status(200).json({
      message: "Todo deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting Todo",
      error: error.message
    });
  }
};



const getAllTodos = async (req, res) => {
    try {
        const todos = await ToDoModel.find({
            userId: req.user._id
        });

        return res.status(200).json({
            count: todos.length,
            todos
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching todos",
            error: error.message
        });
    }
};

module.exports = {
    signUp,
    signIn,
    createTodo,
    dltTodo,
    getAllTodos
}