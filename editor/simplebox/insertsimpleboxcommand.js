import Command from '@ckeditor/ckeditor5-core/src/command';

export default class Insertsimpleboxcommand extends Command {
    execute(text, test) {
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createSimpleBox( writer, text, test ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'simpleBox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleBox( writer, content, isTranscribation ) {
    const simpleBox = writer.createElement( 'simpleBox' );
    const simpleBoxDescription = writer.createElement( 'simpleBoxDescription' );

    if (isTranscribation) {
        writer.appendElement('paragraph', simpleBox)
    }

    writer.append( simpleBoxDescription, simpleBox );
    writer.append( content, simpleBoxDescription );

    return simpleBox;
}
