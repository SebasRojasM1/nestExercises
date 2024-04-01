import { Schema } from 'mongoose';

//Aqui quiero decir que quiero que se guarde en la DB
export const ProductSquema = new Schema({
  name: {type: String, required: true},
  description: String,
  imageURL: String,
  price: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
});


//DEFINIMOS EL MODELO, COMO HACEMOS EN NODE, EN PRODUCTE.MODULE