//netlify is a folder that will be used in the build process
//this is our payment serveless function.

//the endpoint for our serveless function will be 
// '/.netlify/functions/create-payment-intent'
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};

/**
 * 
 * To simulate the serveless endpoint we should install the netlify-cli globlaly
 * 1) npm install -g netlify-cli 
 * 2) netlify 
 * 3) netlify login
 * 4) netlify dev
 */