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

    // Add payment submit listner and make request
        
    const form =document.getElementById('payment-form')
    form.addEventListener('submit', async (e) =>{
        e.preventDefault();
        console.log("hello");

        stripe.confirmPayment({
            elements,
            confirmParams: {
              // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
              return_url: window.location.href.split('?')[0]+'complete.html',
            },
          })
          .then(function(result) {
            if (result.error) {
              // Inform the customer that there was an error.
                const message =document.getElementById('error-message')
                message.innerText=error.message;
            }
          });

        // const {error} = await stripe.confirmPayment({
        //     confirmpParams:{
        //         elements,
        //         reurn_url:window.location.href.split('?')[0]+'complete.html'
        //     }
        // })
        // if(error){
        //     const message =document.getElementById('error-message')
        //     message.innerText=error.message;
        // }
    })

})