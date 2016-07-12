const { $ } = Ember;

export function max() {
  var max = Math.max.apply(null, $.map($(':visible:not(.highest)'), function(element){
    if($(element).css('position') === 'absolute' || $(element).css('position') === 'relative'){
      return ($(element).css('z-index') >> 0) || 1;  // jshint ignore: line
    }
    return 0;
  }));
  return max;
}
