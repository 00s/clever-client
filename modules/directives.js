(function () {
  var exports = {};

  /*

  */

  var SliderDirective = function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="slider"></div>',
      link: function ($scope, elm, attrs) {
        $('.slider').ready(function () {
          var slider = elm[0];
          noUiSlider.create(slider, {
            start: [$scope.lowerPrice, $scope.upperPrice],
            margin: 15,
            connect: true,
            range: {
              'min': 20,
              'max': 200
            },
            pips: {
              mode: 'values',
              values: [20, 200],
              density: 4
            }
          });

          var handle = slider.querySelector('.noUi-handle');
          handle.setAttribute('tabindex', 0);
          handle.addEventListener('click', function(){
          	this.focus();
          });
          handle.addEventListener('keydown', function( e ) {
          	var value = parseInt(slider.noUiSlider.get());
          	switch ( e.which ) {
          		case 37: slider.noUiSlider.set( value - 10 );
          			break;
          		case 39: slider.noUiSlider.set( value + 10 );
          			break;
          	}
          });

          slider.noUiSlider.on('update', function () {
            $(":focus").blur();

            $scope.lowerPrice = parseInt(this.get()[0]);
            $scope.upperPrice = parseInt(this.get()[1]);

            $scope.$apply();
          });
        });
      }
    };
  };

  exports.SliderDirective = SliderDirective;

  /*

  */

  var DatePicker = function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/directives/datePicker.html',
      link: function ($scope, $elm) {
        // Se for resut, é imutável
        if($elm.hasClass('result')){
          return;
        }

        var scheduleTable = Object.keys($scope.datePicker);

        $elm.bind('click', function () {
          $(":focus").blur();
        });

        $elm.find('td').bind('click', function () {
          var $target = $(this);

          var posX = $target.index() - 1;
          var posY = scheduleTable[$target.parent().index() - 1];

          // -1 é o header ("m", "t" ou "n")
          if(posX != -1){
            $target.toggleClass('selected');

            var previousValue = $scope.datePicker[posY][posX];
            $scope.datePicker[posY][posX] = !previousValue;

          }
        });
      }
    };
  };

  exports.DatePickerDirective = DatePicker;

  angular
    .module('clever.directives', [])
    .directive('cleverSlider', exports.SliderDirective)
    .directive('cleverDatePicker', exports.DatePickerDirective);
})();
