// src/index.ts
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer
} from '@jupyterlab/application';

import { ICommandPalette,  MainAreaWidget, IFrame, WidgetTracker } from '@jupyterlab/apputils';

/**
 * Initialization data for the jupyterlab_apod extension.
*/

const activateFunc = async (app: JupyterFrontEnd, palette: ICommandPalette, restorer: ILayoutRestorer) => {
    console.log('JupyterLab extension EverJupyter_React_Mindmap is activated!');

    let widget: MainAreaWidget<IFrame>;
    // Add an application command
    const command: string = 'react-mindmap:open';
    app.commands.addCommand(command, {
    label: 'Open React Mindmap',
    execute: () => {
      if (!widget || widget.isDisposed) {
        // Create a new widget if one does not exist
        // or if the previous one was disposed after closing the panel
        const content = new IFrame({
          sandbox: ['allow-downloads' , 'allow-forms' , 'allow-modals' , 'allow-orientation-lock' , 'allow-pointer-lock' , 'allow-popups' , 'popups-to-escape-sandbox' , 'allow-presentation' , 'allow-same-origin' , 'allow-scripts' , 'allow-storage-access-by-user-activation' , 'allow-top-navigation' , 'allow-top-navigation-by-user-activation'],
          referrerPolicy: 'unsafe-url'
        });
        content.url = "http://localhost:8080/react-mindmap/index.html";
        widget = new MainAreaWidget({ content });
        widget.id = 'react-mindmap-jupyterlab';
        widget.title.label = 'ReactMindmap';
        widget.title.closable = true;
      }
      if (!tracker.has(widget)) {
        // Track the state of the widget for later restoration
        tracker.add(widget);
      }
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

  let tracker = new WidgetTracker<MainAreaWidget<IFrame>>({
    namespace: 'everjupyter-react-mindmap'
  });
  restorer.restore(tracker, {
    command,
    name: () => 'everjupyter-react-mindmap'
  });

}

const extension: JupyterFrontEndPlugin<void> = {
  id: 'react-mindmap',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer],
  activate: activateFunc
};

export default extension;