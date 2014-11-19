export default function () {
    var $ = Ember.$;
    var max = Math.max.apply(null, $.map($(':visible:not(.highest)'), function(element){
        if($(element).css('position') === 'absolute' || $(element).css('position') === 'relative')
            return parseInt($(element).css('z-index')) || 1;  // jshint ignore: line
        })
    );
    return max;
}