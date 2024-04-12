// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('shell-command.execute', () => {

		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			const selectedText = document.getText(selection);

			cp.exec(`echo "${selectedText}" | sort`, (_, output, _1) => {
				console.log('Shell command output: ' + output);

				// Only apply change if output not empty
				output && editor.edit(editBuilder => {
					editBuilder.replace(selection, output);
				});
			});
			
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
