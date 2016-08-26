function unWrapPlaceholder(){
  $(this).contents().unwrap();
  $("#proposition-name").load("service-name.txt");
}

$( document ).ready(function() {
  $('[data-includefile]').each(function(){
    var file = $(this).attr("data-includefile");
    $(this).load("includes/"+$(this).attr("data-includefile")+".html", unWrapPlaceholder)
  });

  //write to local storage
  $('form').storeForm();
  //play back from local storage
  $('.playback-container').getForm();

  //toggle stuff by Ed Horsford @ GDS
  $('body').on('change', 'input', function(){
    var $this = $(this);
    // toggle optional sections
    if ($this.is(':checkbox')){
      var $toggleTarget = $('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
      console.log('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
      if ($toggleTarget.length){
        $toggleTarget.toggle($this.is(':checked') && $this.val() == $toggleTarget.attr('data-toggle-value'));
      }
    } else if ($this.is(':radio')){
      var $toggleTarget = $('.optional-section-'+$this.attr('name'));
      console.log('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
      $toggleTarget.each(function(){
        $(this).toggle($this.val() == $(this).attr('data-toggle-value'));
      });
    }
  });

  $('[data-button-page]').change(function(){
    var buttonid = $(this).attr("data-button-id");
    var url = $(this).attr("data-button-page");
    if ($(this).is(':checked')) {
      $(buttonid).attr("href", url);
    }
  });

  $('.clearStorage').click(function(){
    localStorage.clear();
    $(this).html('&#10003; Data cleared');
  });

  $('input[type=checkbox]').removeAttr('checked');
  $('input[type=radio]').removeAttr('checked');

  saveFormValues([
    'flightNumberCheck',
    'dob-day',
    'dob-month',
    'dob-year'
  ]);
  forkFormFlow();
});

function saveFormValues(fieldIds) {
  $('.button').click(function() {
    fieldIds.forEach(function(fieldId) {
      var fieldValue = $('#' + fieldId).val();
      if (fieldValue) {
        saveToStorage(fieldId, fieldValue);
      }
    });
  });
}

function saveToStorage(fieldId, fieldValue) {
  localStorage.setItem(fieldId, fieldValue);
}

function getFromStorage(fieldId) {
  return localStorage.getItem(fieldId);
}

function forkFormFlow(fieldIds) {
  $('#buttondateofarrival').click(function(e) {
    if (
      (getFromStorage('flightNumberCheck') === 'EK003' || getFromStorage('flightNumberCheck') === 'ek003' ||  getFromStorage('flightNumberCheck') === 'Ek003' ||  getFromStorage('flightNumberCheck') === 'eK003'  ) &&
      getFromStorage('dob-day') === '22' &&
      (getFromStorage('dob-month') === '03' || getFromStorage('dob-month') === '3') &&
      (getFromStorage('dob-year') === '2016' || getFromStorage('dob-year') === '16')
    ) {
      e.preventDefault();
      window.location.href = 'http://localhost:2016/is-this-your-flight.html';
    }
  })
}
