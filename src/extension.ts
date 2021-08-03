// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let normalTag = vscode.commands.registerCommand('assistserb.normalTag', () => {
		addTag("<% ", " %>")
	})
	let replaceTag = vscode.commands.registerCommand('assistserb.replaceTag', () => {
		addTag("<%= ", " %>")
	})
	context.subscriptions.push(normalTag);
	context.subscriptions.push(replaceTag);
}

function addTag(startTag: string, endTag: string) {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const document = editor.document;
		const selection = editor.selection;

		wrapSelectedTextByTag(editor, selection, startTag, endTag);
		editor.selection = goBackSelection(selection, startTag.length);
	}
}

function wrapSelectedTextByTag(editor: vscode.TextEditor, selection: vscode.Selection, startTag: string, endTag: string) {
	editor.edit(editBuilder => {
		editBuilder.insert(selection.start, startTag);
		editBuilder.insert(selection.end, endTag);
	})
}

function goBackSelection(selection: vscode.Selection, range: number): vscode.Selection {
	const anchorPosition = new vscode.Position(selection.anchor.line, selection.anchor.character + range)
	const activePosition = new vscode.Position(selection.active.line, selection.active.character + range)
	return new vscode.Selection(anchorPosition, activePosition)
}

// this method is called when your extension is deactivated
export function deactivate() { }
