$(document).ready(function () {
    let timeFlag = setInterval(function () {
        let $Button = $('.Button.Modal-closeButton.Button--plain');
        if ($Button.length === 0) {
            clearInterval(timeFlag);
        }
        $Button.click();
    }, 500);
})
