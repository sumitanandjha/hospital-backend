import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler('Please fill full form', 400));
    }
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
        success: true,
        message: "Message sent successfully!",
    });
}
);

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
});

export const deleteMessages = catchAsyncErrors(async (req, res, next) => {
    console.log("Entered");
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
        return next(new ErrorHandler("Message Not Found!", 404));
    }
    await message.deleteOne();
    res.status(200).json({
        success: true,
        message: "Message Deleted!",
    });
});