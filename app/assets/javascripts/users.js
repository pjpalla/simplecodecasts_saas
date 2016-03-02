$(document).ready(function(){
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    
    $("#'form-submit-btn'").click(function(event){
        event.preventDefault();
        $('input[type="submit"]').prop('disabled', true);
        var error = false;
        var ccNum = $("#card_number").val();
        var cvcNum = $("#card_code").val();
        var expMonth = $("#card_month").val();
        var  expYear = $("#card_year").val();
            
            if(!error){
                //Get stripe token
                Stripe.createToken({
                    number: ccNum,
                    cvc: cvcNum,
                    exp_month: expMonth,
                    exp_year: expYear
                }, stripeResponseHandler);
            }
            return false;    
});

function StripeResponseHandler(status, response){
    //Get a reference to the form
    var f = $("#new_user");
    
    //Get the token from the response
    var token = response.id;
    
    //Add the token to the form 
    f.append('<input type="hidden" name="user[stripe_card_token] value="' + token + '"/>');
    
    //Submit form
    f.get(0).submit();
    }
});