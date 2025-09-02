import mongoose from "mongoose";



const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    nameAuthor: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
        type: String,
        required: true,
        enum: [
            "Novel",
            "Sci-Fi",
            "Biography",
            "Mystery",
            "Fantasy",
            "Non-Fiction",
            "Romance",
            "History",
            "Children",
            "Horror"
        ]
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Book = mongoose.model("Book", bookSchema);

export default Book;