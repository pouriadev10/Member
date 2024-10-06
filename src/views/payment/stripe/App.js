import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from "./config";
import CheckoutForm from "./CheckoutForm";

import "./App.css";
import { controller } from './controller';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.



export default function App() {

  //const stripeKey = key.key
  //var stripePromise = loadStripe(stripeKey);


  const [stripePromise, setStripePromise] = useState(loadStripe("pk_test_51MAqq8CNeee53AsqwaTVMANFg6c63QIvRIwOP6TpZf3AupUR2iGiwDOOrPTLIDq8KW5vFkHFpBu5ZNqkzTdGwjik00DnjnWTLd",
    {
      stripeAccount: "acct_1NXNiWFtOAJzYLFh"
    }
  ));
  const [clientSecret, setClientSecret] = useState("");
  const [account_id, setAccount_id] = useState("");
  const [stripeKey, setStripeKey] = useState("")
  const [pKey, setPKey] = useState("")


  const getStripeKey = async () => {
    const response = await controller.getStripeKey();
    console.log(response.public_key)
    setStripeKey(response.publishable_key)
    setAccount_id(response.connected_account)
    setClientSecret(response.subscription_secret)
    
  }

  useEffect(() => {
    // Read stripe key
    getStripeKey()

    // Create PaymentIntent as soon as the page loads


  }, []);
  const appearance = {
    theme: 'stripe',
  };

  const stripePromise1 =
    loadStripe(stripeKey,
      {
        stripeAccount: account_id
      }
    )


  const options = {
    clientSecret,
    appearance
  };

  return (
    <div className="App">
      
      {clientSecret && (
        <Elements options={options} stripe={stripePromise1}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}