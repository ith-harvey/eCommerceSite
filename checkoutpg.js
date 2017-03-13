Stripe.setPublishableKey('pk_test_QDIS84x2mHLMRwWXHM6bgV27');
var ccErrors = [];
var errors = false;
var errorsAfterCopy = false;

$('#purchase').on('click', function(e) {
  ccErrors = [];
  errors = false;
  errorsAfterCopy = false;

  e.preventDefault();
  validateShipInput();
  validateBillInput();
  validateCCInput();
  if (errors) {
    if (ccErrors.length > 0) {
      displayccErrors();
    } else {
      displayErrors();
    }
  } else {
    $('.message').removeClass('alert-danger').addClass('alert-info');
    $('.message').empty();
    $('.message').append(`<strong>Thank you for your purchase!</strong>`);
    $('.form-control').removeClass('invalid').removeClass('valid');
    document.getElementById('checkout-form').reset();
  }

})

$('.required').on('change', function() {
  $(this).removeClass('valid').addClass('invalid');

  if ($(this).val() !== '') {
    $(this).removeClass('invalid').addClass('valid');
  } else {
    $(this).removeClass('valid').addClass('invalid');
  }
})

$('.required').on('blur', function() {
  if ($(this).val()) {
    $(this).removeClass('invalid').addClass('valid');
  } else {
    $(this).removeClass('valid').addClass('invalid');
  }
})

$('.required-zip').on('input', function() {
  validateZipcode($(this))
})

$('.required-zip').on('blur', function() {
  validateZipcode($(this));
})

$('.required-cc').on('blur', function() {
  if ($(this).val() && $(this).hasClass('valid')) {
    $(this).removeClass('invalid');
  } else {
    $(this).removeClass('valid').addClass('invalid');
  }
})

$('.required-cc').on('input', function() {
  if ($(this).val() && $(this).hasClass('valid')) {
    $(this).removeClass('invalid');
  } else {
    $(this).removeClass('valid').addClass('invalid');
  }
})

$('.card-number').on('keydown', function(e) {
  return validateCardNumber($(this),e.key);
})

$('.card-cvc').on('keydown', function(e) {
  return  validateCVC($(this),e.key);
})

$('select').on('change', function() {
  $(this).removeClass('valid').addClass('invalid');

  if ($(this).val() !== '') {
    $(this).removeClass('invalid').addClass('valid');
  } else {
    $(this).removeClass('valid').addClass('invalid');
  }
})

$("#checkbox").change(function() {
  if (this.checked) {
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

function validateShipInput() {
  if ($('#ship-first-name').val() == '') {
    $('#ship-first-name').addClass('invalid').removeClass('.valid');
    errors = true;
  }
  if ($('#ship-last-name').val() == '') {
    $('#ship-last-name').addClass('invalid').removeClass('.valid');
    errors = true;
  }
  if ($('#ship-address-line1').val() == '') {
    $('#ship-address-line1').addClass('invalid').removeClass('.valid');
    errors = true;
  }
  if ($('#ship-city').val() == '') {
    $('#ship-city').addClass('invalid').removeClass('.valid');
    errors = true;
  }
  if ($('#ship-state').val() == '') {
    $('#ship-state').addClass('invalid').removeClass('.valid');
    errors = true;
  }
  validateZipcode($('#ship-zipcode'));
  if ($('#ship-zipcode').hasClass('invalid')) {
    errors = true;
  }
}

function validateBillInput() {
  errorsAfterCopy = false;
  if ($('#bill-first-name').val() == '') {
    $('#bill-first-name').addClass('invalid').removeClass('.valid');
    errors = true;
    errorsAfterCopy = true;
  } else {
    $('#bill-first-name').removeClass('invalid').addClass('valid');
  }
  if ($('#bill-last-name').val() == '') {
    $('#bill-last-name').addClass('invalid').removeClass('.valid');
    errors = true;
    errorsAfterCopy = true;
  } else {
    $('#bill-last-name').removeClass('invalid').addClass('valid');
  }
  if ($('#bill-address-line1').val() == '') {
    $('#bill-address-line1').addClass('invalid').removeClass('.valid');
    errors = true;
    errorsAfterCopy = true;
  } else {
    $('#bill-address-line1').removeClass('invalid').addClass('valid');
  }
  if ($('#bill-city').val() == '') {
    $('#bill-city').addClass('invalid').removeClass('.valid');
    errors = true;
    errorsAfterCopy = true;
  } else {
    $('#bill-city').removeClass('invalid').addClass('valid');
  }
  if ($('#bill-state').val() == '') {
    $('#bill-state').addClass('invalid').removeClass('.valid');
    errors = true;
    errorsAfterCopy = true;
  } else {
    $('#bill-state').removeClass('invalid').addClass('valid');
  }
  validateZipcode($('#bill-zipcode'));
  if ($('#bill-zipcode').hasClass('invalid')) {
    errors = true;
    errorsAfterCopy = true;
  } else {
    $('#bill-zipcode').removeClass('invalid').addClass('valid');
  }
}

function validateCCInput() {
  if ($('.card-number').hasClass('invalid') || $('.card-number').val() == '') {
    $('.card-number').addClass('invalid').removeClass('valid');
    errors = true;
  }
  if ($('.card-expiry-month').val() == '') {
    $('.card-expiry-month').addClass('invalid').removeClass('valid');
    errors = true;
  }
  if ($('.card-expiry-year').val() == '') {
    $('.card-expiry-year').addClass('invalid').removeClass('valid');
    errors = true;
  }
  if ($('.card-cvc').hasClass('invalid') || $('.card-cvc').val() == '') {
    $('.card-cvc').addClass('invalid').removeClass('valid');
    errors = true;
  }
  if (!errors) {
    validateCardWithStripe();
  }
}

function validateCardNumber(element,key) {
  var input = element.val();
  if (/^\d|\s|\-$/.test(key)|| key=='Backspace'){
    var str = input.split(/\s|-/).join('');
    if (key=='Backspace'){
      var len = str.length - 3;
    } else {
      console.log("here")
      var len = str.length;
    }
    if (len >=15){
      element.removeClass('invalid').addClass('valid');
      element.val(str.substr(0,4) + ' ' + str.substr(4,4) + ' ' + str.substr(8,4) + ' ' + str.substr(12,4))
      return true;
    }
    element.removeClass('valid').addClass('invalid');
    return true;
  }
  return false;
}

function validateCVC(element,key) {
  var input = element.val();
  if ((!isNaN(key)) || key=='Backspace'){
    if (/^\d{2}$/.test(input)){
      element.removeClass('invalid').addClass('valid');
      return true;
    }
    element.removeClass('valid').addClass('invalid');
    return true;
  }
  return false;
}

function validateZipcode(element){
  var input = element.val();
  if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(input)) {
    element.removeClass('invalid').addClass('valid');
  } else {
    element.removeClass('valid').addClass('invalid');
  }
}

function displayErrors() {
  $('.message').empty();
  $('.message').removeClass('alert-info');
  $('.message').addClass('alert-danger');
  $('.message').append(`<p>Some required information is missing!</p>`);
}

function displayccErrors() {
  $('.message').empty();
  $('.message').removeClass('alert-info');
  $('.message').addClass('alert-danger');
  $('.message').append(`<p>${ccErrors[0]}</p>`);
}

function validateCardWithStripe() {
  var cardNo = $('.card-number');
  var cardNoCleaned = cardNo.val().split('').join('');
  var cvv = $('.card-cvc');
  var cardMonth = $('.card-expiry-month');
  var cardYear = $('.card-expiry-year');

  function validator(callback, ccInfo) {
    return callback(ccInfo);
  }

  if (!validator(Stripe.card.validateCardNumber, cardNo.val())) {
    ccErrors.push('Your card number is incorrect');
    cardNo.addClass('invalid');
    errors = true;
  }
  if (!validator(Stripe.card.validateCVC, cvv.val())) {
    ccErrors.push('Your card\'s security code is invalid.');
    cvv.addClass('invalid');
    errors = true;
  }
  if (!validator(Stripe.card.validateExpiry, cardMonth.val() + ' ' + cardYear.val())) {
    ccErrors.push('Your card\'s expiration is invalid');
    cardMonth.addClass('invalid');
    cardYear.addClass('invalid');
    errors = true;
  }
}
