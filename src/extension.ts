// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';

async function getExecutedCommand(lastCommand: string | undefined) {
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
	let disposable = vscode.commands.registerCommand('shell-command.execute', async () => {

		try {
			const editor = vscode.window.activeTextEditor;
			if(!editor) {
				console.log('shell-command error: editor is (unexpectedly) null.');
				return;
			}

            // Get saved command
            let command: string | undefined = context.globalState.get(LAST_COMMAND_KEY);
            if(!command)
                command = 'sort -h'
        
            // Show prompt to get command to be executed.
            command = await getExecutedCommand(command);
			context.globalState.update(LAST_COMMAND_KEY, command);

            // Replace selected text with command result.
            const document = editor.document;
            const selection = editor.selection;

            // Get the word within the selection
            const selectedText = document.getText(selection);

            let cmd = `echo "${selectedText}" | ${command}`;
            cp.exec(cmd, (_, output, _1) => {
                console.log('Shell command output: ' + output);

                // Only apply change if output not empty
								output = output && output.trim()
                output && editor.edit(editBuilder => {
                    editBuilder.replace(selection, output);
                });
            });
		}
		catch(ex) {
			console.log(`shell-command error: ${ex}`)
		}			
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
