$(".feature1")
    .on("mouseenter", function() {
        $(".button1").show();
    })
    .on("mouseleave", function() {
        $(".button1").hide();
    });

$(".feature2")
    .on("mouseenter", function() {
        $(".button2").show();
    })
    .on("mouseleave", function() {
        $(".button2").hide();
    });

$(".feature3")
    .on("mouseenter", function() {
        $(".button3").show();
    })
    .on("mouseleave", function() {
        $(".button3").hide();
    });


$(document).ready(function() {
    $("#myModal").modal('show');
});

$(".subscribe-form").submit(function(e) {
    $("#myModal").modal('hide');
    e.preventDefault();
});


function carouselButton(e) {
    if (e.target.id == 'leftway') {
        clearInterval(nIntervId)
        switchAddRemClass($('.carousel-isdisplay').attr('data-position'), '-')
        runCarousel()
    } else if (e.target.id == 'rightway') {
        clearInterval(nIntervId)
        switchAddRemClass($('.carousel-isdisplay').attr('data-position'), '+')
        runCarousel()
    }
}

function switchAddRemClass(dataPosition, direction) {
    dataPositionStr = '[data-position="' + dataPosition + '"]'
    console.log(dataPositionStr, direction)
    if (direction === '+') {
        if (dataPositionStr == '[data-position="3"]') {
            $(dataPositionStr).removeClass('carousel-isdisplay')
            $(dataPositionStr).addClass('inside-carousel-nodisplay')
            dataPositionStr = '[data-position="1"]'
            $(dataPositionStr).removeClass('inside-carousel-nodisplay')
            $(dataPositionStr).addClass('carousel-isdisplay')
        } else {
            $(dataPositionStr).removeClass('carousel-isdisplay')
            $(dataPositionStr).addClass('inside-carousel-nodisplay')
            dataPositionStr = "[data-position=" + (Number(dataPosition) + 1) + "]"
            console.log(dataPositionStr)
            $(dataPositionStr).removeClass('inside-carousel-nodisplay')
            $(dataPositionStr).addClass('carousel-isdisplay')
        }
    } else if (direction === '-') {
        if (dataPositionStr == '[data-position="1"]') {
            $(dataPositionStr).removeClass('carousel-isdisplay')
            $(dataPositionStr).addClass('inside-carousel-nodisplay')
            dataPositionStr = '[data-position="3"]'
            $(dataPositionStr).removeClass('inside-carousel-nodisplay')
            $(dataPositionStr).addClass('carousel-isdisplay')
        } else {
            $(dataPositionStr).removeClass('carousel-isdisplay')
            $(dataPositionStr).addClass('inside-carousel-nodisplay')
            dataPositionStr = "[data-position=" + (Number(dataPosition) - 1) + "]"
            $(dataPositionStr).removeClass('inside-carousel-nodisplay')
            $(dataPositionStr).addClass('carousel-isdisplay')
        }
    }
}


function runCarousel() {
    nIntervId = setInterval(function() {
        switchAddRemClass($('.carousel-isdisplay').attr('data-position'), '+')
    }, 4000);
}


runCarousel()
$('#rightway').on('click', carouselButton);
$('#leftway').on('click', carouselButton);
