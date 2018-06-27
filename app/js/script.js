$(function () {

    $(".menu li").mouseenter(function (e) {
        var t = $(this).position().left;
        var curId = $(this).attr("id");
        $("." + curId).css({ 'left': t });
        $(".item").hide();
        $("." + curId).show();
        $(".submenu").stop(true, true).slideDown(500);
        $(".item a").stop(true, true).animate({ 'left': "20px", "opacity": "0" }, 1000);
        $("." + curId + " a").stop(true, true).animate({ 'left': "0px", "opacity": "1" }, 1000);
    })

    $("header .row").mouseleave(function (e) {
        $(".submenu").stop(true, true).slideUp(500);
        $(".item").hide();
        $(".item a").stop(true, true).animate({ 'left': "20px", "opacity": "0" }, 1000);
    })

    $(".next").click(function(){
        $(".slide:visible").fadeOut(400, function(){
            $(this).next(".slide").fadeIn(400);
            var currentSlide = $(this).detach();
            $('.slider-holder').append(currentSlide);
        });       
    });

    $(".prew").click(function(){
        $(".slide:visible").fadeOut(400, function(){
            $(".slide").last().fadeIn(400);
            var lastSlide = $(".slide").last().detach();
            $('.slider-holder').prepend(lastSlide);
        });       
    });

    $(".pop-up").click(function(e){
        e.preventDefault();
        $(".overlay").fadeIn(300, function(){
            $(".overlay-content").fadeIn(100);
        });
    })

    $(".overlay").click(function(){
        $(this).fadeOut(200);
    })

    $(".overlay-video").click(function(){
        $(this).fadeOut(200);
    })

    $(".img-static").click(function(){
        var parentBlock = $(this).parent().attr("class");
        $(this).hide();
        $('.'+parentBlock+' .gif').show();
    })

    $(".gif").click(function(){
        var parentBlock = $(this).parent().attr("class");
        $(this).hide();
        $('.'+parentBlock+' .img-static').show();
    })

    $(".colors span").click(function(){
        var curColor = $(this).attr("class");
        var src = '../img/yi-lite-'+curColor+'.png';
        $(".yi-lite-color").attr('src', src)
    })

    $(".angle").click(function(){
        $(".angle").css({"opacity":"1"});
        $(this).css({"opacity":"0.5"});
        var curAngle = $(this).attr("id");
        console.log(curAngle)

        $(".stage img").each(function(){
            if(+$(this).attr("data-angle") > +curAngle){
                console.log($(this).attr("data-angle"));
                $(this).css({"opacity":"0.5"})
            }
            else{
                $(this).css({"opacity":"1"})
            }
        })
    })

    $(".play").click(function(){
        $("#dash-lens").trigger("play");
    })

    $(".dash-example").click(function(){
        var curSrcVideo = $(this).attr("data-video");
        $(".overlay-video-content video").attr("src", curSrcVideo);
        $(".overlay-video").fadeIn(300, function(){
            $(".overlay-video-content").fadeIn(100);
            
        });
    });

    $(".menu-button").click(function(e){
        e.preventDefault()
        $(".mobile-menu").slideToggle();
        $(this).toggleClass('close');
    })

    $('.prew-img').click(function(){
        $(this).siblings('.large-img').attr('src', $(this).attr("src"));
    })

    /*setInterval(function(){
        $(".slide:visible").fadeOut(400, function(){
            $(this).next(".slide").fadeIn(400);
            var currentSlide = $(this).detach();
            $('.slider-holder').append(currentSlide);
        })}, 3000)*/
});

// Я зрабіў усё што змог, хто зможа, хай зробіць лепш!
