'use strict';

import * as mixins from './mixins';

const methods = Object.assign({}, mixins.main('task', '/api/v1/task'));

export default Object.assign({}, methods);
