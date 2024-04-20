# shell-command README

This is the README for your extension "shell-command". After writing up a brief description, we recommend including the following sections.

## Notes

- [VSX Data Storage](https://code.visualstudio.com/api/extension-capabilities/common-capabilities#data-storage) - API for storing extension state (last executed command)

- [VSX Get user input from input box](https://www.codepedia.org/snippets/60dbfb494095c204661309bf/get-user-input-from-input-box-in-visual-studio-code)

- Video recording tool: recordmydesktop
    - recordmydesktop --on-the-fly-encoding
- If recorded video is "black": This is caused by wayland in compatibility.
    See Solution [here](https://askubuntu.com/questions/1347489/ubuntu-22-04-any-screen-recorders-not-working-showing-black-screen-only)
    - sudo systemctl restart gdm3
    
- Video editting tool: OpenShot Video Editor

```shell
    # Open /etc/gdm3/custom.conf 
    # Uncomment below line:
    WaylandEnable=false

    # Run below command to reload config
    sudo systemctl restart gdm3
```

- Side effect: shell command output will be print at cursor if you don't select anything.
    This can be used as side effect to run and get output of shell commands.

## Dev Notes

<!-- Install extension from vsix -->
code --install-extension myextension.vsix

