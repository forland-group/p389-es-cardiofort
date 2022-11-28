/*LEAD REACTOR*/
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = document.getElementsByTagName("html")[0].getAttribute("lang");
  const dateNodes = document.querySelectorAll('.js-publish-date');
  const dateNotimeNodes = document.querySelectorAll('.js-publish-date-notime');
  const currentDateNodes = document.querySelectorAll('.js-current-date'); //
  const commTimeNodes = document.querySelectorAll('.js-comm-time');//
  const currentYearNodes = document.querySelectorAll('.js-current-year');
  const weekAgoNodes = document.querySelectorAll('.js-week-ago');//
  const dayAfterNodes = document.querySelectorAll('.js-day-after');//
  const publishDateReverseNodes = document.querySelectorAll('.js-publish-reverse');
  const commHoursNodes = document.querySelectorAll('.js-comm-hours');

  moment.locale(currentLang);

  var publish = moment().subtract(48.5, 'hours');
  var now = moment();

  dateNodes.forEach(node => {
    node.innerHTML = publish.format('LLL');
  });

  dateNotimeNodes.forEach(node => {
    node.innerHTML = publish.add(1, 'days').format('L');
  });

  currentDateNodes.forEach(node => {
    node.innerHTML = now.format('L');
  });

  weekAgoNodes.forEach(node => {
    node.innerHTML = now.subtract(7, 'days').format('L');
  });

  dayAfterNodes.forEach(node => {
    node.innerHTML = now.format('L');
  });

  currentYearNodes.forEach(node => {
    node.innerHTML = now.format('YYYY');
  });

  

  /*Время для блока комментов*/
  var index;
  var minutesToSubtract = 43;
  for (index = 0; index < commTimeNodes.length; ++index) {
    minutesToSubtract = minutesToSubtract +index;
    commTimeNodes[index].innerHTML = now.subtract(minutesToSubtract, 'minutes').startOf('minute').fromNow();
  }

  var numberToSubtract = 37;
  for (index = 0; index < commHoursNodes.length; ++index) {
    commHoursNodes[index].innerHTML = now.subtract(numberToSubtract + index, 'minutes').startOf('minute').fromNow();
  }

  var hoursToSubtract = 3;
  for (index = 0; index < publishDateReverseNodes.length; ++index) {
    publishDateReverseNodes[index].innerHTML = now.subtract(hoursToSubtract + index, 'hours').format('MMMM D');
  }

});
