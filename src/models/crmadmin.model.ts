import { model, models, Schema } from "mongoose";

const CrmSchema = new Schema(
    {
        fullname: { type: String, required: true},
        login: { type: String, required: true},
        password: { type: String, required: true, unique: true},
        phone: { type: String, required: true},
        role: {type: String, enum: ['owner', 'adminstrator'], required: true },
        educationCenter: { type: Schema.Types.ObjectId, ref: "EducationCenter" },
    },
    { timestamps: true }
)

const CrmAccount = models.CRMAccounts || model("CRMAccounts", CrmSchema);
export default CrmAccount;