
let rTextSmall = $('.rTextSmall');
let rTextLarge = $('.rTextLarge');
let exp = '';
let histNo = 0;
let histContainer = $('.histContainer');
if (histNo === 0) {
    $('.historyContainer').text(`There's no History yet`);
}
if (exp === '') {
    rTextSmall.css('opacity', '0');
    rTextLarge.css('opacity', '100');
    rTextLarge.text('0');
}

function check() {
    if (exp === '') {
        rTextSmall.css('opacity', '0');
        rTextLarge.css('opacity', '100');
        rTextLarge.text('0');
    }
}

$('.historyShowBtn').on('click', function (e) {
    $('#rightContainer').addClass('historyWrapper');
    $('.historyWrapper').css('display', 'flex');
    $('.historyWrapper').removeAttr('id').addClass('rightContainerSmall');

});



$('.rTextLarge').on('input', function (e) {
    exp = $('.rTextLarge').text();
    rTextSmall.css('opacity', '100');
    rTextSmall.val(`= ${eval(exp)}`);
});

$(document).bind('click', function (e) {
    var target = $(e.target);
    if (target.is('.histCal')) {
        let histId = target.attr('id');
        exp = $(`.histCal#${histId} .histTextSmall`).text();
        rTextLarge.text(exp);
        rTextSmall.css('opacity', '100');
        rTextSmall.val(`= ${eval(exp)}`);
        if ($('.historyWrapper')) {
            $('.historyWrapper').css('display', 'none');
            $('.historyWrapper').removeAttr('id').addClass('rightContainerSmall');
        }
        e.preventDefault();

    } else if (target.is('#theme1')) {
        $('body').css('background', 'linear-gradient(#F15F79,#B24592)');
        $('#theme2').removeClass('default');
        $('#theme3').removeClass('default');
        $('#theme1').addClass('default');
        e.preventDefault();

    }
    else if (target.is('.historyWrapper')) {
        $('.historyWrapper').css('display', 'none');
        $('.historyWrapper').removeAttr('id').addClass('rightContainerSmall');
        e.preventDefault();
    }
    else if (target.is('.historyContainer')) {
        $('.historyWrapper').css('display', 'none');
        $('.historyWrapper').removeAttr('id').addClass('rightContainerSmall');
        e.preventDefault();
    }
    else if (target.is('#theme2')) {
        $('#theme1').removeClass('default');
        $('#theme3').removeClass('default');
        $('body').css('background', 'linear-gradient(#434343,#000000)');
        $('#theme2').addClass('default');
        e.preventDefault();
    }
    else if (target.is('#theme3')) {
        $('#theme1').removeClass('default');
        $('#theme2').removeClass('default');
        $('body').css('background', 'linear-gradient(#004e92,#000428)');
        $('#theme3').addClass('default');
        e.preventDefault();
    }
});

$('.commonBtn').on('click', function () {

    let value = $(this).data('value');
    if (histNo === 0) {
        $('.historyContainer').text(`There's no History yet`);
    }

    if (value.includes('equals')) {
        if (exp.includes('i')) {
            if (("" + Math.pow(exp, -1)).length === 13) {
                rTextLarge.css('font-size', '50px');
            } else if (("" + Math.pow(exp, -1)).length === 16) {
                rTextLarge.css('font-size', '40px');
            }
            else if (("" + Math.pow(exp, -1)).length === 20) {
                rTextLarge.css('font-size', '30px');
            }
            else if (("" + Math.pow(exp, -1)).length < 13) {
                rTextLarge.css('font-size', '60px');
            }

        } else {

            if (("" + eval(exp)).length === 13) {
                rTextLarge.css('font-size', '50px');
            } else if (("" + eval(exp)).length === 16) {
                rTextLarge.css('font-size', '40px');
            }
            else if (("" + eval(exp)).length === 20) {
                rTextLarge.css('font-size', '30px');
            }
            else if (("" + eval(exp)).length < 13) {
                rTextLarge.css('font-size', '60px');
            }
        }
    } else {
        if (exp.length === 13) {
            rTextLarge.css('font-size', '50px');
        } else if (exp.length === 16) {
            rTextLarge.css('font-size', '40px');
        }
        else if (exp.length === 20) {
            rTextLarge.css('font-size', '30px');
        }
        else if (exp.length < 13) {
            rTextLarge.css('font-size', '60px');
        }

    }
    if (exp === '') {
        if (value.includes('v')) {
            exp = exp + value.replace('v', '');
            rTextLarge.text(exp);
            rTextSmall.css('opacity', '100');
            rTextSmall.val(`= ${eval(exp)}`);
        }
    } else if (exp !== '') {
        if (value.includes('delete')) {
            exp = exp.substring(0, exp.length - 1);
            rTextLarge.text(exp);
            rTextSmall.css('opacity', '100');
            try {
                rTextSmall.val(eval(exp));
            } catch (err) {
                rTextSmall.val(`= ${eval(exp.substring(0, exp.length - 1))}`);
            }
        }
        else if (value.includes('clear')) {
            exp = '';
            rTextLarge.text('0');
            rTextSmall.css('opacity', '100');
            rTextSmall.val(`= ${eval(exp)}`);
        }
        else if (exp.includes('+') || exp.includes('-') || exp.includes('*') || exp.includes('/') || exp.includes('%')) {

            if (value.includes('operator') || value.includes('equals')) {
                let lastChar = exp.charAt(exp.length - 1);
                if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
                    exp = exp.substring(0, exp.length - 1) + value.replace('operator', '');
                    rTextLarge.text(exp);
                    rTextSmall.css('opacity', '100');
                    rTextSmall.val(`= ${eval(exp)}`);

                } else if (value.includes('equals')) {

                    if (histNo === 0) {
                        histNo = 1;
                        $('.historyContainer').html(`<div class="histCal" id="hist${histNo}">
                        <div class="textSmall histTextSmall" readonly>${exp}</div>
                        <div readonly class="textLarge histTextLarge">${eval(exp)}</div>
                        </div>`);

                    } else {
                        histNo = histNo + 1;
                        $(`<div class="histCal" id="hist${histNo}">
                        <div class="textSmall histTextSmall" readonly>${exp}</div>
                        <div readonly class="textLarge histTextLarge">${eval(exp)}</div>
                        </div>`).insertBefore($(`#hist${(histNo - 1)}`));
                    }
                    rTextSmall.css('opacity', '0');
                    rTextLarge.text(`${eval(exp)}`);
                    exp = '' + eval(exp);
                } else {
                    exp = exp + value.replace('operator', '');
                    rTextLarge.text(exp);
                    rTextSmall.css('opacity', '100');
                    rTextSmall.val(`= ${eval(exp)}`);
                }
            }
            else if (value.includes('v')) {
                exp = exp + value.replace('v', '');
                rTextLarge.text(exp);
                rTextSmall.css('opacity', '100');
                rTextSmall.val(`= ${eval(exp)}`);
            }
        } else {
            if (value.includes('v')) {
                exp = exp + value.replace('v', '');
                rTextLarge.text(exp);
                rTextSmall.css('opacity', '100');
                rTextSmall.val(`= ${eval(exp)}`);
            } else if (value.includes('operator')) {
                exp = exp + value.replace('operator', '');
                rTextLarge.text(exp);
                rTextSmall.css('opacity', '100');
                rTextSmall.val(`= ${eval(exp.substring(0, exp.length - 1))}`);
            } else if (value.includes('pn')) {
                exp = value.replace('pn', '-') + exp;
                rTextLarge.text(exp);
                rTextSmall.css('opacity', '100');
                rTextSmall.val(`= ${eval(exp)}`);
            }
        }
    }
    check();
});

$('.dustBinBtn').on('click', function () {
    $('.historyContainer').text(`There's no History yet`);
    histNo = 0;
});
