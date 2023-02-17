document.addEventListener('DOMContentLoaded', async () => {
    // Fetch publishable key and init Stripe
    
    const publishableKey  = await fetch ("/config").then(r=>r.json())
    console.log(publishableKey.publishableKey);
    const stripe = Stripe(publishableKey.publishableKey);
    

    // Fetch payment intent Client Secret
     console.log("how are you");
    const {clientsecret } = await fetch("/create-payment",{
    method: "POST",
    Headers:{
        "Content-Type":"application/json"
    },
}).then(r => r.json())

    // Mount the element
  console.log(clientsecret);
    // const elements = Stripe( clientsecret )  
    var elements = stripe.elements({
        clientSecret: clientsecret,
      });
    console.log(elements);
    var paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element')
    console.log("hihi");

})