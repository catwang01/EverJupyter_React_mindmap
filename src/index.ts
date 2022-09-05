// src/index.ts
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the jupyterlab_apod extension.
*/

const activateFunc = async (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension EverJupyter_React_Mindmap is activated!');

    // Create a blank content widget inside of a MainAreaWidget
    const content = new Widget();
    content.addClass('react-mindmap'); // new line
    const widget = new MainAreaWidget({ content });
    widget.id = 'react-mindmap-jupyterlab';
    widget.title.label = 'ReactMindmap';
    widget.title.closable = true;

    // Add an image element to the content
    let iframe = document.createElement('iframe');
    iframe.src = "http://127.0.0.1:8080/react-mindmap/index.html"
    iframe.frameBorder="0" 
    iframe.marginHeight="0" 
    iframe.marginWidth="0" 
    iframe.width="100%" 
    iframe.height="100%" 
    iframe.scrolling="auto"
    content.node.appendChild(iframe);

    // Add an application command
    const command: string = 'react-mindmap:open';
    app.commands.addCommand(command, {
    label: 'Open React Mindmap',
    execute: () => {
      if (!widget.isAttached) {
        // Attach the widget to the main work area if it's not there
        app.shell.add(widget, 'main');
      }
      // Activate the widget
      app.shell.activateById(widget.id);
    }
    });

  // Add the command to the palette.
  palette.addItem({ command, category: 'ReactMindMap' });

  app.contextMenu.addItem({
    command,
    selector: '*'
  }) 

}

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-apod',
  autoStart: true,
  requires: [ICommandPalette],
  activate: activateFunc
};

export default extension;