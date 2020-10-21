var drumMachineApp = window.singleSpaAngularjs.default({
    angular: window.angular,
    domElementGetter: function() {
      // A div with this id will be added to our index.html later, in step four
      return document.getElementById('drum-machine')
    },
    mainAngularModule: 'AngularDrumMachine',
    uiRouter: false,
    preserveGlobal: true,
    // This template will be built in step four
    template: '<display-machine />',
  })

  window.singleSpa.registerApplication(
    'drum-machine', 
    drumMachineApp, 
    function activityFunction(location) {
      return true;
    }
  )
  window.singleSpa.start();