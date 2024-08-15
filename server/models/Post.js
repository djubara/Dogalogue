import { get, model, Schema } from "mongoose";

const postSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
            required: true
        },
        photoUrl: {
            type: String,
            required: false
        },
        comments: [
            {
                author: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                content: {
                    type: String,
                    required: true
                },
                created: {
                    type: Date,
                    default: (new Date(Date.now())).toISOString(),
                    get: timestamp => (new Date(timestamp)).toISOString(),
                },
            }
        ],
        
        // meta
        created: {
            type: Date,
            default: (new Date(Date.now())).toISOString(),
            get: timestamp => (new Date(timestamp)).toISOString(),
        },
        modified: {
            type: Date,
            default: (new Date(Date.now())).toISOString(),
            get: timestamp => (new Date(timestamp)).toISOString()
        },
    },
    {
    id: true
    }
)