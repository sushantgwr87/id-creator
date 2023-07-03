import * as vscode from 'vscode';

export function transformSelectedText(selectedText: string): string {
    // Remove spaces and replace with "-"
    let transformedText = selectedText.replace(/\s+/g, '-');
    
    // Remove special characters (excluding numbers)
    transformedText = transformedText.replace(/[^a-zA-Z0-9-]/g, '');

    return transformedText;
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerTextEditorCommand('extension.transformSelectedText', (textEditor, edit) => {
        const selectedText = textEditor.document.getText(textEditor.selection);
        const transformedText = transformSelectedText(selectedText);

        // Replace the selected text with the transformed text
        edit.replace(textEditor.selection, transformedText);
    });

    context.subscriptions.push(disposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}
