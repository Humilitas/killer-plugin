$(document).ready(function () {
    console.log(1)
    let timeFlag = setInterval(function () {
        let $Button = $('.ui-overlay-close');
        if ($Button.length === 0) {
            clearInterval(timeFlag);
        }
        $Button.click();
    }, 500);
})
