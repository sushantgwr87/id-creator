import * as vscode from 'vscode';

export function transformSelectedText(selectedText: string): string {
    // Convert selected text to lowercase
    let transformedText = selectedText.toLowerCase();

    // Remove spaces and replace with "-"
    transformedText = transformedText.replace(/\s+/g, '-');
    
    // Remove special characters (excluding numbers)
    transformedText = transformedText.replace(/[^a-zA-Z0-9-]/g, '');

    return transformedText;
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerTextEditorCommand('extension.transformSelectedText', (textEditor, edit) => {
        textEditor.selections.forEach((selection) => {
            const selectedText = textEditor.document.getText(selection);
            const transformedText = transformSelectedText(selectedText);

            // Replace each selected text with the transformed text
            edit.replace(selection, transformedText);
        });
    });

    context.subscriptions.push(disposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}
