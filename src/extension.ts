import * as vscode from "vscode";

export function transformSelectedText(selectedText: string): string {
  let transformedText = selectedText
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\s-]/g, "-")
    .toLowerCase()
    .replace(/-{2,}/g, "-")
    .replace(/(^-+|-+$)/g, "")
    .replace(/(-\s*-\s*-)|(-{2,})/g, "-")
    .replace(/\s*-\s*/g, "-");

  return transformedText;
}

function convertMarkdownLink(editor: vscode.TextEditor | undefined): void {
  if (editor) {
    const selection = editor.selection;
    const text = editor.document.getText(selection);

    // Check if the selected text is a Markdown-style link
    const match = /\[([^\]]+)\]\(([^)]+)\)/.exec(text);

    if (match && match.length === 3) {
      const linkText = match[1];
      const linkURL = match[2];

      const formattedText = `<a rel="noopener" target="_blank" href="${linkURL}">${linkText}</a>`;
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, formattedText);
      });
    } else {
      vscode.window.showInformationMessage(
        "Selected text is not a Markdown-style link."
      );
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerTextEditorCommand(
    "extension.transformSelectedText",
    (textEditor, edit) => {
      textEditor.selections.forEach((selection) => {
        const selectedText = textEditor.document.getText(selection);
        const transformedText = transformSelectedText(selectedText);

        // Replace each selected text with the transformed text
        edit.replace(selection, transformedText);
      });
    }
  );

  let disposableNewFunction = vscode.commands.registerCommand(
    "extension.convertMarkdownLink",
    () => {
      convertMarkdownLink(vscode.window.activeTextEditor);
    }
  );

  context.subscriptions.push(disposableNewFunction);

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
