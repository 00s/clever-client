(function () {
  var exports = {};

  var TeacherCardDirective = function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/directives/teacherCard.html',
      controllerAs: 'cardCtrl',
      transclude: true,
      controller: function($element, $transclude) {
        var ctrl = this;
        var content = $element.find('teacher-card-details'); 
        var transcludedScope;
      
        ctrl.expand = function() {
          $transclude(function(transEl, transScope) {
            content.append(transEl);
            transcludedScope = transScope;
            transScope.teacherCardCardCollapse = ctrl.collapse;
          });
          ctrl.expanded = true;
        };
        
        ctrl.collapse = function() {
          transcludedScope.$destroy();
          transcludedScope = null;
          content.empty();
          ctrl.expanded = false;
        };
      }
    };
  };

  exports.TeacherCardDirective = TeacherCardDirective;

  var SliderDirective = function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="slider"></div>',
      link: function ($scope, elm, attrs) {
        $('.slider').ready(function () {
          var slider = elm[0];
          noUiSlider.create(slider, {
            start: [$scope.price_start, $scope.price_end],
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

            $scope.price_start = parseInt(this.get()[0]);
            $scope.price_end = parseInt(this.get()[1]);

            $scope.$apply();
          });
        });
      }
    };
  };

  exports.SliderDirective = SliderDirective;


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

          var pos = ($target.parent().index() - 1)  * 5 + $target.index();

          $target.toggleClass('selected');

          var previousValue = $scope.datePicker[pos];
          $scope.datePicker[pos] = !previousValue;
        });
      }
    };
  };

  exports.DatePickerDirective = DatePicker;

  angular
    .module('clever.directives', [])
    .directive('cleverSlider', exports.SliderDirective)
    .directive('cleverDatePicker', exports.DatePickerDirective)
    .directive('teacherCard', exports.TeacherCardDirective);
})();
