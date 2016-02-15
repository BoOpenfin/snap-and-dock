/* globals fin, DockingManager */
'use strict';

/**
 * Created by haseebriaz on 03/03/15.
 */

window.addEventListener('DOMContentLoaded', function() {
    fin.desktop.main(function() {

        var dockingManager = DockingManager.getInstance();
        dockingManager.register(fin.desktop.Window.getCurrent(), false);
        var counter = 0;

        function createChildWindow() {

            var dw = new fin.desktop.Window({

                name: 'child' + counter++,
                url: 'childWindow.html',
                defaultWidth: 200,
                defaultHeight: 150,
                defaultTop: (screen.availHeight - 200) / 2,
                defaultLeft: (screen.availWidth - 150) / 2,
                frame: false,
                resize: true,
                windowState: 'normal',
                autoShow: true

            }, function() {

                dockingManager.register(dw);
            });


            return dw;
        }

        document.getElementById('createWindows').onclick = createChildWindow;

        fin.desktop.InterApplicationBus.subscribe('*', 'register-docking-window', function(message) {
            var appUuid = message.applicationUuid;
            var name = message.windowName;
            console.log('Registering docking window', appUuid, name);
            var javaWindow = fin.desktop.Window.wrap(appUuid, name);
            dockingManager.register(javaWindow);
        });
        fin.desktop.InterApplicationBus.publish("status-update", {status: 'ready'});

    });

});
