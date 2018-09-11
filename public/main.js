// import EventsHandler from './event-handler.js';

// let eventsHandler = new EventsHandler();

// eventsHandler.addClient();

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

$('#result').css('visibility','hidden');


$(function () {
    $('[data-toggle="popover"]').popover({
        placement: "top",
        delay: { 'show': 500 }
    })
})

$('#submit').on('click', () => {
    let name = $('#name').val();
    let email = $('#email').val();
    let text = $('#message').val();
    var $result = $("#result");
    if (!name || !email || !text) {
        alert('Please fill all required fields !!');
        $('[data-toggle="popover"]').popover('dispose');
    }
    else if (!validateEmail(email)) {
        $result.text(email + " is not valid !");
        $result.css({"color": "red", "visibility": "visible"});
        $('[data-toggle="popover"]').popover('dispose');
    }
    else {
        $('#result').css('display','none');
        $('#name').val("");
        $('#email').val("");
        $('#message').val("");
        $('[data-toggle="popover"]').popover('enable');
        $.post(
            '/clients',
            { name: name, email: email, message: text },
            function (data, status) {
                console.log(status);
                if (status) {
                    $('[data-toggle="popover"]').popover('show', {
                        placement: 'top'
                    });
                }
            }
        )
    }
})

$(".navbar a , .arrow-button").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 900, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    } // End if
});

/* Every time the window is scrolled ... */
$(window).scroll(function () {

    /* Check the location of each desired element */
    $('.hideme').each(function (i) {

        var bottom_of_object = $(this).position().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it it */
        if (bottom_of_window > bottom_of_object * 0.5) {

            $(this).animate({ 'opacity': '1' }, 1500);

        }

    });

});