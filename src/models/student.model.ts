import { Schema, model, models } from "mongoose";


const StudentSchema = new Schema({
  name: String,
  surname: String,
  phone: String,
  course: { type: Schema.Types.ObjectId, ref: "Course" }, // Kursga referens
  coins: [{type: Number, default: 0}]
  
}, { timestamps: true });
  

StudentSchema.virtual("totalCoins").get(function(){
  return this.coins.reduce((sum, coin)=> sum + coin, 0)
})

  const Student = models.Student || model("Student", StudentSchema);
  export default Student;