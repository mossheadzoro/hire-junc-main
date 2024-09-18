import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51DpVXWGc9EcLzRLBNKni929hB026lACv6toMfjH1FPtIXfYgIrhXzjolcYzDDl2VwtvmyPF20PJ1JaMUCTNoEwDN00FN8hrRZL"
);
const prisma=new PrismaClient();

//CREATE ORDER ------------------------------------------------------------------------------------------------------------------------------------

export const createOrder = async (req, res, next) => {
  try {
    if (req.body.gigId) {
      const { gigId } = req.body;
      const prisma = new PrismaClient();

      // Fetch the gig details
      const gig = await prisma.gigs.findUnique({
        where: { id: parseInt(gigId) },
      });

      if (!gig) {
        return res.status(404).send("Gig not found");
      }

      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        capture_method: "manual", // Ensuring payment capture is manual
      });

      // Log the payment intent details for debugging
      // console.log("Payment Intent Created: ", paymentIntent);

      // Save the order in the database
      const order = await prisma.orders.create({
        data: {
          paymentIntent: paymentIntent.id,
          price: gig.price,
          buyer: { connect: { id: req.userId } }, // Ensure that req.userId is present
          gig: { connect: { id: gig.id } },
          isCompleted: false, // Mark as incomplete initially
          isApproved:false,
        },
      });

      
      // console.log("Order Created: ", order);

      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(400).send("Gig ID is required.");
    }
  } catch (err) {
    console.log("Error in createOrder: ", err);
    return res.status(500).send("Internal Server Error");
  }
};


//CONFIRM ORDER AFTER PAYMENT ---------------------------------------------------------------------------------------------------------------------------


export const confirmOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body;

    // Validate the data
    if (!paymentIntent) {
      return res.status(400).json({ error: 'Missing paymentId' });
    }else{
      console.log(paymentIntent)
    }

    // Create or update order with payment intent and initial status
    const order = await prisma.orders.update({
      where:{paymentIntent:paymentIntent},
      data: {
        isApproved:false,
        isCompleted: true,  // Initially incomplete
      },
    });

    res.status(200).json({ success: true, order });
    
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ error: 'Order confirmation failed' });
  }
};


//RELEASE PAYMENT ONLY AFTER CHECKING YOUR WORK ---------------------------------------------------------------------------------------------------------

export const releasePayment = async (req, res, next) => {
  try {
    const { paymentIntentId } = req.body;
    const prisma = new PrismaClient();

    // console.log("PaymentintId from releasePayment:",paymentIntentId);

    if (!paymentIntentId) {
      return res.status(400).send("Payment Intent ID is required.");
    }

    // Log the received paymentIntentId
    // console.log("Received PaymentIntentId: ", paymentIntentId);

    // Fetch the order by paymentIntentId
    const order = await prisma.orders.findUnique({
      where: { paymentIntent: paymentIntentId },
    });

// console.log(order);
    if (!order) {
      return res.status(404).send("Order not found.");
    }

    if (order.isApproved) {
      return res.status(400).send("Order is already completed.");
    }


    // Capture the payment
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);

    // Log the payment capture details
    // console.log("Payment Captured: ", paymentIntent);

    // Update the order status
    await prisma.orders.update({
      where: { paymentIntent: paymentIntentId },
      data: { isCompleted: true ,isApproved:true },
    });

    res.status(200).send({
      message: "Payment captured successfully!",
      paymentIntent,
    });
  } catch (err) {
    console.log("Error in releasePayment: ", err);
    return res.status(500).send("Internal Server Error");
  }
};


//FETCH ORDERS FOR BUYERS-------------------------------------------------------------------------------------------------------------------------


export const getBuyerOrders = async (req, res, next) => {
  try {
    // console.log("getBuyer is calling here is your req.userId",req.userId);
    if (req.userId) {
      
      const prisma = new PrismaClient();
      const orders = await prisma.orders.findMany({
        where: { buyerId: req.userId ,isCompleted:true },
        include: { gig: true },
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};


//FETCH ORDER FOR SELLER--------------------------------------------------------------------------------------------------------------------------------


export const getSellerOrders = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const orders = await prisma.orders.findMany({
        where: {
          gig: {
            createdBy: {
              id: parseInt(req.userId),
            },
          },
          isCompleted: true,
        },
        include: {
          gig: true,
          buyer: true,
        },
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};




