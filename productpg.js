
function shopAllProducts(element){
 $('.pets, .boat, .sale, .people').removeClass('product-hidden')
};

function sortPeople(element){
$('.pets, .boat, .sale, .people').removeClass('product-hidden')
$('.pets, .boat, .sale').addClass('product-hidden')
};

function sortPets(element){
$('.pets, .boat, .sale, .people').removeClass('product-hidden')
$('.people, .boat, .sale').addClass('product-hidden')
};

function sortBoat(element){
$('.pets, .boat, .sale, .people').removeClass('product-hidden')
$('.pets, .people, .sale').addClass('product-hidden')
};

function sortSale(element){
$('.pets, .boat, .sale, .people').removeClass('product-hidden')
$('.pets, .boat, .people').addClass('product-hidden')
$('.sale').removeClass('product-hidden')
};



function sortPrice50(element){
 $('.item').each(function(i, item){
   var price = parseInt(this.attributes['data-price'].value)

   if (price < 50) {
    $(this).removeClass('product-hidden').addClass('product-visable')
  } else {
    $(this).addClass('product-hidden')
  }
 })
};

function sortPrice50to100(element){
  $('.item').each(function(i, item){
    var price = parseInt(this.attributes['data-price'].value)

    if (price < 100 && price > 50) {
      $(this).removeClass('product-hidden').addClass('product-visable')
    } else {
      $(this).addClass('product-hidden')
    }
  })
};

function sortPrice100to750(element){
  $('.item').each(function(i, item){
    var price = parseInt(this.attributes['data-price'].value)
    if (price <= 950 && price > 100) {
      $(this).removeClass('product-hidden').addClass('product-visable')
    } else {
      $(this).addClass('product-hidden')
    }
  })
};

function sortPriceOver950(element){
  $('.item').each(function(i, item){
    var price = parseInt(this.attributes['data-price'].value)

    if (price > 950) {
      $(this).removeClass('product-hidden').addClass('product-visable')
    } else {
      $(this).addClass('product-hidden')
    }
  })
};

function callItems() {
  $.ajax({
    url: 'https://galvanize-student-apis.herokuapp.com/gcommerce/products',
    method: 'GET'
    }).then(function (response) {
    console.log(response.length)
    console.log(response)
    }).catch(function (error) {
    console.log('error', error);
  })
}
callItems();

$('#shopall').on('click', shopAllProducts)
$('#people').on('click', sortPeople)
$('#pets').on('click', sortPets)
$('#boats').on('click', sortBoat)
$('#sale').on('click', sortSale)
$('#under50').on('click', sortPrice50)
$('#50to100').on('click', sortPrice50to100)
$('#100to750').on('click', sortPrice100to750)
$('#over950').on('click', sortPriceOver950)
