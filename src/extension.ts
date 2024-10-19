// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';

// Get command from prompt
async function getCommandFromPrompt(lastCommand: string | undefined) {
	const command = await vscode.window.showInputBox({
		placeHolder: "Command line",
		prompt: "The commandline to be executed.",
		value: lastCommand
	});

	if(!command){
		console.log(command);
		vscode.window.showErrorMessage('A search query is mandatory to execute this action');
		return;
	}

	return command;
}

// On-Activate
export function activate(context: vscode.ExtensionContext) {

	const LAST_COMMAND_KEY = 'shellcommand.lastcommand';
	context.globalState.setKeysForSync([LAST_COMMAND_KEY]);

	// Register command
	let disposable = vscode.commands.registerCommand(
		'shell-command.execute', 
		async (args: any) => {
			try {
				const editor = vscode.window.activeTextEditor;
				if(!editor) {
					console.log('shell-command error: editor is (unexpectedly) null.');
					return;
				}

				// 1. Check if command param provided
				let {command} = args || {};

				// 2. If not from params, show prompt to get command
				if(!command) {
					
					// let command: string | undefined = context.globalState.get(LAST_COMMAND_KEY);
					command = context.globalState.get(LAST_COMMAND_KEY);
					// Show prompt to get command to be executed.
					command = await getCommandFromPrompt(command);
					
					// User cancelled
					if(!command) {
						vscode.window.showErrorMessage('A command must be provided.');
						return;
					}

					context.globalState.update(LAST_COMMAND_KEY, command);
				}

				// Replace selected text with command result.
				const document = editor.document;
				const selection = editor.selection;

				// Get the word within the selection
				const selectedText = document.getText(selection);

				// NOTE: when no text is selected, 
				// the command output is the side-effect of the command.

				let cmd = `echo '${selectedText}' | ${command}`;
				let options = {
					shell: 'bash'
				};

				// cp.spawnSync(cmd, {shell: true})
				// 	.

				cp.exec(cmd, options, (error, output, stderr) => {
						console.log('Shell command error: ' + error);
						console.log('output: ' + output);
						console.log('stderr: ' + stderr);

						// Only apply change if output not empty
						output = output && output.trim();
						output && editor.edit(editBuilder => {
								editBuilder.replace(selection, output);
						});
				}, );
			}
			catch(ex) {
				console.log(`shell-command error: ${ex}`);
			}			
		});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
