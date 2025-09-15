import mongoose, { Schema,Document } from 'mongoose';

export interface ILog extends Document {
    level:"info" | "error" | "warn" | "debug";
    processId?:string;
    userId?:string;
    message:string;
    source:string;
    metadata?:Record<string,any>;
    timestamp:Date;
}

const LogSchema: Schema = new Schema({
    level: {type: String,enum: ["info", "warn", "error", "debug"],required: true},
    processId: { type: String },
    userId: { type: String },
    message: { type: String, required: true },
    source: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ILog>("Logger", LogSchema);