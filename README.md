# shell-command README

A VSCode extension that allow user to run shell commands on selected text in the editor.

## Caveat

- This extension use `bash` shell to execute the shell commands. So you should have `bash` shell installed.
- Bash comes with git. But you need to set the %PATH% `system` (not `user`) environment. Otherwise, it might not work.

## Features

- You can call any command that is available in your shell.
- You can run a command when selecting nothing, the command output will be print at the pointer (side effect).
- The previously ran command is remembered, so that you don't have to enter again.
- If you execute some commands frequently, you can create a shortcut for it, pass the command-line to be executed as "command" argument.
    - Ctrl-Shift-P > Keyboard shortcut JSON
    - Add a new entry like below, replace "key" with the key you want and "command" with command you want to execute.

```json
    {
      "key": "alt+t",         // whatever you want for a keybinding
      "command": "shell-command.execute",
      "args": {
        "command": "gawk -F' ' '{print $9 \"\t\t\t\" $5}'"
      }
    }
```

- Some examples of how to use the tool is shown below:

Sed command example (filter line)

![example sed filter](images/demo%20sed.gif)

Sort command example

![sort command example](images/demo%20sort.gif)

Gawk command example

![gawk command example](images/demo%20gawk.gif)

## Build and install

```shell

npm run esbuild

# install vsce tool
npm install -g @vscode/vsce

# build vsix file
vsce package

# open vscode extensions, then select vsix file to install
```

## Requirements

The command you want to run must be available in your shell.

## Release Notes

### 1.0.0

Initial release.

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
