window.$ = window.jQuery;
jQuery(document).ready(function(){

  window.TST = window.TST || {
      onReady: function() {
        TST.init(TST.config);
        TST.SearchWidget.create({

          // The tag / node that the widget should be attached to
          tag: '#tst-widget',

          // Products: ALL, flight, car, hotel, activity
          products: ['flight'],


          // this is the "selected" or "active" tab when the widget initializes.
          focus: 'cruises',

          // determines horizontal / vertical layout
          tabDirection: 'vertical',

          // include flight times true or false
          flightTimes: true,

          // have subset of form fields until focus; when focus is activated, form will "zoom in" to fields and occupy more space
          zoomEffect: false,

          extras: {
              autoComplete: true,
              datePicker: true
              },
        });
      }
    };

    (function(window, document) {
      window.TST.config = {
        host: 'amatravel.tstllc.net'
      }
      var w = document.createElement('script');
      w.type = 'text/javascript'; w.async = true;
      w.src = 'https://' + window.TST.config.host + '/web-services/assets/javascript/tst-api.min.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(w, s);
    })(window, document);
	
});