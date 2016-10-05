/* eslint no-new-func: 0, prefer-template: 0 */

'use strict';

import { get } from 'jsonpointer';
import locales from '../constants/locales';
import { isPlainObject } from './util/object';

const delimiters = {
  start: '<%',
  end: '%>',
};

// Voir: http://ejohn.org/blog/javascript-micro-templating/
export const template = (str = '') =>
  new Function('obj',
    'var ret=[];' +
    'with(obj){ret.push(\'' +
    str
      .replace(/[\r\t\n]/g, ' ')
      .split(delimiters.start).join('\t')
      .replace(new RegExp(`((^|${delimiters.end})[^\\t]*)'`, 'g'), '$1\r')
      .replace(new RegExp(`\\t=(.*?)${delimiters.end}`, 'g'), '\',$1,\'')
      .split('\t').join('\');')
      .split(delimiters.end).join('ret.push(\'')
      .split('\r').join('\\\'') +
    '\');}return ret.join(\'\');'
  );

/**
 * localize renvoie le texte formaté avec les locales.
 * @param {string} key représentant le path dans le fichier des locales
 * @param {Object?} options
 * @param {string?} def valeur par défaut
 * @returns {string}
 */
export const localize = (key, options = {}, def = '') => {
  const local = get(locales, key);
  if (isPlainObject(local) || Array.isArray(local)) {
    return local;
  }
  return template(local === null ? def : local)(options);
};
