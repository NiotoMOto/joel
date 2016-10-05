'use strict';

import * as mixins from './mixins';

const methods = Object.assign({}, mixins.main('user', '/api/v1/user'));

export default Object.assign({}, methods);
