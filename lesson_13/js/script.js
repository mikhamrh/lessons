(function () {
    var rotateY = 0,
        rotateX = 0;
    
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 83:
                rotateX -= 4;
                break;
            case 87:
                rotateX += 4;
                break;
            case 65:
                rotateY -= 4;
                break;
            case 68:
                rotateY += 4;
        }

        document.querySelector('.cube__container').style.transform =
        'rotateY(' + rotateY + 'deg)'+
        'rotateX(' + rotateX + 'deg)';
    }
}) ();