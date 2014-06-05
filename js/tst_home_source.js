(function() {
  (function($) {
    AMA.TstWidget = (function() {
      var Results, Search;

      function TstWidget() {
        var results, search, widget;
        widget = $('.tst-select-wrapper');
        if ((widget.children('input')).length === 0) {
          results = new Results();
          widget.append(results.container);
          search = new Search();
          widget.prepend(search.input);
        }
      }

      Search = (function() {
        function Search() {
          this.input = $("<input type='text' class='tst-search-box' placeholder='type a destination'></input>");
          this.input.autocomplete({
            minLength: 3,
            messages: {
              noResults: '',
              results: function() {}
            },
            appendTo: '.search-results',
            source: function(request, response) {
              var match, matches, product, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
              matches = Search.matches(request.term);
              if (matches.length === 1) {
                matches[0]['product'] = 'city';
                matches[0]['url'] = AMA.deals[matches[0].airport_code] || "";
                _ref = AMA.products;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  product = _ref[_i];
                  matches.push({
                    label: matches[0].short_name + ' ' + product,
                    product: product.toLowerCase(),
                    url: Search.tst_url(matches[0].airport_code, product.toLowerCase())
                  });
                }
              } else if (matches.length === 0) {
                _ref1 = AMA.products;
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                  product = _ref1[_j];
                  matches.push({
                    label: product,
                    product: product.toLowerCase(),
                    url: "http://www.ama.ab.ca/travel"
                  });
                }
              } else {
                for (_k = 0, _len2 = matches.length; _k < _len2; _k++) {
                  match = matches[_k];
                  match['product'] = "multiple-matches";
                  match['url'] = "";
                }
              }
              return response(matches);
            },
            focus: function(event, ui) {
              return event.preventDefault();
            },
            select: function(event, ui) {
              if (ui.item.product === 'multiple-matches') {
                return setTimeout((function() {
                  $(event.target).autocomplete("widget").show();
                  return $(event.target).autocomplete('search');
                }), 1);
              } else {
                event.preventDefault();
                if (typeof dcsMultiTrack === typeof Function) {
                  dcsMultiTrack('DCS.dcsuri', document.URL, 'WT.ti', 'Travel Search Box', 'WT.dl', '27', 'DCSext.w_www_travel_search_box', event.target.value + ' / ' + ui.item.product);
                }
                if (ui.item.url && ui.item.url !== "") {
                  return setTimeout((function() {
                    return window.location.href = ui.item.url;
                  }), 1000);
                }
              }
            },
            open: function(event, ui) {
              $('.tst-select-wrapper li.multiple-matches').click(function(e) {
                return e.preventDefault();
              });
              return $('.tst-select-wrapper a').click(function(e) {
                return e.preventDefault();
              });
            }
          }).data('ui-autocomplete')._renderItem = function(ul, item) {
            var element;
            element = "<a>" + item.label + "</a>";
            if (item.product === 'city' && !AMA.deals[item.airport_code]) {
              element = item.label;
            }
            return $("<li class='" + item.product + "'></li>").data("item.autocomplete", item).append(element).appendTo(ul);
          };
          this.input.blur(function() {
            return $(this).autocomplete('search');
          });
        }

        Search.tst_url = function(destination, product) {
          switch (product) {
            case "cars":
              return AMA.base_url + "/car/search?pickUpLocation=" + destination + "&pickUp=" + Search.format_date(new Date, 1) + "&dropOff=" + Search.format_date(new Date, 8);
            case "hotels":
              return AMA.base_url + "/hotel/search?location=" + destination + "&adults=1&checkIn=" + Search.format_date(new Date, 1) + "&checkOut=" + Search.format_date(new Date, 8);
            case "flights":
              return "https://amatravel.tstllc.net/flight";
            case "packages":
              return "http://www.ama.ab.ca/travel/vacation-packages";
          }
        };

        Search.format_date = function(d, offset) {
          var curr_date, curr_month, curr_year;
          d.setDate(d.getDate() + offset);
          curr_date = d.getDate();
          curr_month = d.getMonth() + 1;
          curr_year = d.getFullYear();
          return curr_month + "/" + curr_date + "/" + curr_year;
        };

        Search.matches = function(query) {
          var matcher, safe_query;
          safe_query = $.ui.autocomplete.escapeRegex(query);
          matcher = new RegExp("^" + safe_query, "i");
          return $.grep(AMA.destinations, function(d) {
            var _i, _len, _ref;
            _ref = d.queries;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              query = _ref[_i];
              if (matcher.test(query)) {
                return true;
              }
            }
            return false;
          });
        };

        return Search;

      })();

      Results = (function() {
        function Results() {
          this.container = $("<div class='search-results'></div>");
        }

        return Results;

      })();

      return TstWidget;

    }).call(this);
    return $(document).ready(function() {
      var widget;
      return widget = new AMA.TstWidget();
    });
  })(jQuery.noConflict());

}).call(this);