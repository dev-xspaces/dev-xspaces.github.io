$(document).ready(function () {
    var requestId;

    function rotateCard(card, mouseX, mouseY) {
        var cardWidth = card.width();
        var cardHeight = card.height();
        var rotateY = (mouseX - cardWidth / 2) / cardWidth * 15; // Ajuste o valor para controlar o ângulo de rotação no eixo Y
        var rotateX = (mouseY - cardHeight / 2) / cardHeight * -15; // Ajuste o valor para controlar o ângulo de rotação no eixo X

        card.stop().transition({
            perspective: '600px',
            rotateY: rotateY,
            rotateX: rotateX
        }, 300);
    }

    function handleMouseMove(e) {
        var card = $(this);
        var mouseX = e.pageX - card.offset().left;
        var mouseY = e.pageY - card.offset().top;

        cancelAnimationFrame(requestId);
        requestId = requestAnimationFrame(function () {
            rotateCard(card, mouseX, mouseY);
        });
    }

    function resetCard(card) {
        card.stop().transition({
            perspective: '600px',
            rotateY: 0,
            rotateX: 0
        }, 300);
    }

    $('.card')
        .on('mousemove', handleMouseMove)
        .on('mouseleave', function () {
            var card = $(this);

            cancelAnimationFrame(requestId);
            resetCard(card);
        })
        .css('will-change', 'transform');
});