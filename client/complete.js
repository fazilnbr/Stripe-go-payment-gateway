

document.addEventListener('DOMContentLoaded',async()=>{
    
    // Fetch the publishable key and init stripe

    const publishableKey  = await fetch ("/config").then(r=>r.json())
    console.log(publishableKey.publishableKey);
    const stripe = Stripe(publishableKey.publishableKey);

    // Use params to retrive the payment intent
    
    const params = new URLSearchParams(window.location.href)
    const clientsecret = params.get("payment_intent_client_secret")
    const {paymentIntent} =  await stripe.retrevePaymentIntent(clientsecret)

    // Render the payment intent json

    const paymentIntentPre =  document.getElementById('payment-intent')
    paymentIntentPre.innerText = JSON.stringify(paymentIntent,null,2)


})