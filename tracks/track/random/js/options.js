define(['init'], function (BH) {

  var el = $$('[data-option]');

  el.addEvent('click', function (e) {
    var opt = this.getProperty('data-option');
    BH.get('user').setOption(opt, this.get('checked'));
  });

  el = $('opt-color');
  el.addEvent('click:relay(div)', function (e) {
    var targ = $(e.target), col = targ.getProperty('title');
    if (col) {
      BH.get('user').setOption('color', col);
    }
    $('bhr-style').set('href', '/style/style-' + col + '.css?new');
  });

});