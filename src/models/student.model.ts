import { Schema, model, models } from "mongoose";

const CoinSchema = new Schema(
  {
    value: { type: Number, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD formatda
  },
  { _id: false }
);

const StudentSchema = new Schema({
  name: String,
  surname: String,
  phone: String,
  studentID: String,
  course: { type: Schema.Types.ObjectId, ref: "Course" }, // Kursga referens
  coins: [CoinSchema],
  lastDateCoin: { type: Date, default: null },
  
}, { timestamps: true });
  

StudentSchema.virtual("totalCoins").get(function(){
  return this.coins.reduce((sum, coin)=> sum + coin.value, 0)
})

  const Student = models.Student || model("Student", StudentSchema);
  export default Student;