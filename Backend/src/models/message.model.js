import mongose from "mongoose";

const messageSchema = new mongose.Schema(
  {
    senderId: {
      type: mongose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongose.model("Message", messageSchema);

export default Message;
