import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
   products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
            },
        ],
        required: true,
        default: [],
    },
});

const cartsModel = mongoose.model("carts", cartsSchema);

export default cartsModel;
