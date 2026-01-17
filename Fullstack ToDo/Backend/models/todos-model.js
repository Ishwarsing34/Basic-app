const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: ""
        },
        completed: {
            type: Boolean,
            default: false
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        }
    },

);

const ToDoModel = mongoose.model("Todo", todoSchema);


module.exports = {
    ToDoModel
}
