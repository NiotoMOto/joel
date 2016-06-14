'use strict';

import toastr from 'toastr';

export default ({ type = 'success', message, title }, options = {}) => {
  toastr.options = Object.assign({
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '2000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
  }, options);

  toastr[type](message, title);
};
