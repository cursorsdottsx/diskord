import { ObjectId } from "mongodb";
import { Document, model, Model, models, Schema } from "mongoose";
import { IMessage, messageSchema } from "./message";

export interface IChannel extends Document {
    guild: string;
    messages: IMessage[];
    pinned: string[];
    nsfw: boolean;
    slowmode: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export const channelSchema = new Schema(
    {
        guild: {
            type: ObjectId,
            required: true,
        },
        messages: {
            type: [messageSchema],
            default: [],
        },
        pinned: {
            type: [ObjectId],
            default: [],
        },
        nsfw: {
            type: Boolean,
            default: false,
        },
        slowmode: {
            type: Number,
            default: 0,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const channels = (models["channels"] as Model<IChannel>) || model<IChannel>("channels", channelSchema);

export default channels;
