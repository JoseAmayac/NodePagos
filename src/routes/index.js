const router = require('express').Router();
const stripe = require('stripe')('sk_test_oFzfJsr7nDTcIkcn6AFNq6iq00PgNmT48v');
router.get('/',(req,res)=>{
    res.render('index');
});

router.post('/checkout',async(req,res)=>{
   const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source:req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount: '3000',
        currency: 'usd',
        customer: customer.id,
        description: 'Contability software'
    });
    console.log(charge.id);
    //Final show a success view
    res.render('download');
});
module.exports = router;