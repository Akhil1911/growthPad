import braintree from 'braintree'
import orderModel from '../models/orderModel.js'
import dotenv from 'dotenv'
dotenv.config()
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

export const brainTreeTokenController = async(req,res)=>{
    try{
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err)
            }else{
                res.send(response)
            }
        })
    }catch(err){
        console.log(err)
    }
}
export const brainTreePaymentController = async(req,res)=>{
 try {
   const { nonce, amount , tuition_id,student_id } = req.body;
   
   let newTransaction = gateway.transaction.sale(
     {
       amount: amount,
       paymentMethodNonce: nonce,
       options: {
         submitForSettlement: true,
       },
     },
     function (error, result) {
       if (result) {
         const order = new orderModel({
           tuition_id,
           payment: result,
           student_id
         }).save();
         res.json({ ok: true });
       } else {
         res.status(500).send(error);
       }
     }
   );
 } catch (error) {
   console.log(error);
 }
}