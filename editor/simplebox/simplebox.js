import SimpleBoxEditing from './simpleboxediting';
import SimpleBoxUI from './simpleboxui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Simplebox extends Plugin {
    static get requires() {
        return [ SimpleBoxEditing, SimpleBoxUI ];
    }
}