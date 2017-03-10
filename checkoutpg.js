Stripe.setPublishableKey('pk_test_QDIS84x2mHLMRwWXHM6bgV27');
var ccErrors= [];
var errors = false;

$('#purchase').on('click',function(e){
  errors = false;
  e.preventDefault();
  validateShipInput();
  validateBillInput();
  validateCCInput();
  if (errors){
    displayErrors();
  }
  else {
    $('.message').removeClass('alert-danger');
    $('.message').addClass('alert-info');
    $('.message').append(`<strong>Thank you for purchase!</strong>`);
    document.getElementById('checkout-form').reset()
  }

})

$('.required').on('input','keypress','focus',function(){
  $(this).removeClass('valid').addClass('invalid');

  if ($(this).val()!==''){
    $(this).removeClass('invalid').addClass('valid');
  }
  else{
    $(this).removeClass('valid').addClass('invalid');
  }
})

$('.required').on('blur',function(){
  if ($(this).val()){
    $(this).removeClass('invalid').removeClass('valid');
  }
  else{
    $(this).removeClass('valid').addClass('invalid');
  }
})

$('.required-zip').on('input',function(){
  var input = $(this).val();
  if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(input)){
      $(this).removeClass('invalid').addClass('valid');
    }
  else {
    $(this).removeClass('valid').addClass('invalid');
  }
})

$('.card-number').on('input',function(){
  var input = $(this).val();
  $(this).removeClass('valid').addClass('invalid');
  if (/^[\d\s]+$/.test(input)){
      if (input.length>=16){
        $(this).removeClass('invalid').addClass('valid');
      }
      else {
        $(this).removeClass('valid').addClass('invalid');
      }
  } else {
    $(this).val('');
    $(this).removeClass('valid').addClass('invalid');
  }
})

$('.card-cvc').on('input',function(){
  var input = $(this).val();
  $(this).removeClass('valid').addClass('invalid');
      if (/(^\d{3}$)/.test(input)){
        $(this).removeClass('invalid').addClass('valid');
      }
      else {
        $(this).removeClass('valid').addClass('invalid');
      }
})

$('select').on('change', function(){
  $(this).removeClass('valid').addClass('invalid');

  if ($(this).val()!==''){
    $(this).removeClass('invalid').addClass('valid');
  }
  else{
    $(this).removeClass('valid').addClass('invalid');
  }
})

$("#checkbox").change(function() {
    if(this.checked) {
      $('#bill-first-name').val($('#ship-first-name').val());
      $('#bill-last-name').val($('#ship-last-name').val());
      $('#bill-company-name').val($('#ship-company-name').val());
      $('#bill-address-line1').val($('#ship-address-line1').val());
      $('#bill-address-line2').val($('#ship-address-line2').val());
      $('#bill-city').val($('#ship-city').val());
      $('#bill-state').val($('#ship-state').val());
      $('#bill-zipcode').val($('#ship-zipcode').val());
      validateBillInput();
    }
})

function validateShipInput(){
  if ($('#ship-first-name').val()===''){
    $('#ship-first-name').addClass('invalid');
    errors=true;
  }
  if ($('#ship-last-name').val()==''){
    $('#ship-last-name').addClass('invalid');
    errors=true;
  }
  if ($('#ship-address-line1').val()==''){
    $('#ship-address-line1').addClass('invalid');
    errors=true;
  }
  if ($('#ship-city').val()==''){
    $('#ship-city').addClass('invalid');
    errors=true;
  }
  if ($('#ship-state').val()==''){
    $('#ship-state').addClass('invalid');
    errors=true;
  }
  if ($('#ship-zipcode').val()==''){
    $('#ship-zipcode').addClass('invalid');
    errors=true;
  }
  if ($('.card-number').val()==''){
    $('.card-number').addClass('invalid');
    errors = true;
  }
  if ($('.card-expiry-month').val()==''){
    $('.card-expiry-month').addClass('invalid');
    errors = true;
  }
  if ($('.card-expiry-year').val()==''){
    $('.card-expiry-year').addClass('invalid');
    errors = true;
  }
  if ($('.card-cvc').hasClass('invalid')){
    errors = true;
  }
}

function validateCCInput(){
  if (!errors){
    validateCardWithStripe();
  }
}

function validateBillInput(){
  if ($('#bill-first-name').val()==''){
    console.log("here")
    $('#bill-first-name').addClass('invalid');
    errors=true;
  }
  if ($('#bill-last-name').val()==''){
    $('#bill-last-name').addClass('invalid');
    errors=true;
  }
  if ($('#bill-address-line1').val()==''){
    $('#bill-address-line1').addClass('invalid');
    errors=true;
  }
  if ($('#bill-city').val()==''){
    $('#bill-city').addClass('invalid');
    errors=true;
  }
  if ($('#bill-state').val()==''){
    $('#bill-state').addClass('invalid');
    errors=true;
  }
  if ($('#bill-zipcode').val()==''){
    $('#bill-zipcode').addClass('invalid');
    errors=true;
  }
}

function displayErrors(){
  $('.message').empty();
  $('.message').addClass('alert-danger');
  $('.message').append(`<p>Some information is missing!</p>`);
}

function displayccErrors(){
  $('.message').empty();
  if (ccErrors.length>0){
    $('.message').append(`<p>${ccErrors[0]}</p>`);
  }
}

function validateCardWithStripe() {
  var cardNo = $('.card-number');
  var cvv = $('.card-cvc');
  var cardMonth = $('.card-expiry-month');
  var cardYear = $('.card-expiry-year');

  function validator(callback,ccInfo){
    return callback(ccInfo);
  }

  if (!validator(Stripe.card.validateCardNumber, cardNo.val())){
    ccErrors.push('Your card number is incorrect');
    cardNo.addClass('invalid');
  }
  if (!validator(Stripe.card.validateCVC, cvv.val())){
    ccErrors.push('Your card\'s security code is invalid.');
    cvv.addClass('invalid');
  }
  if (!validator(Stripe.card.validateExpiry,cardMonth.val() + ' ' +    cardYear.val())){
    ccErrors.push('Your card\'s expiration is invalid');
    cardMonth.addClass('invalid');
    cardYear.addClass('invalid');
  }
  displayccErrors();
}
