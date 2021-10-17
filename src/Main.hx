package ;

import haxe.ui.HaxeUIApp;

import haxe.ui.core.Component;
import haxe.ui.macros.ComponentMacros;
import haxe.ui.Toolkit;
import haxe.ui.components.Button;
import haxe.ui.components.CheckBox;
import haxe.ui.components.Image;
import haxe.ui.containers.dialogs.Dialog;
import haxe.ui.containers.dialogs.Dialog.DialogButton;
import haxe.ui.containers.dialogs.MessageBox.MessageBoxType;

class Main {
    public static function main() {
        var app = new HaxeUIApp();
        app.ready(function() {

        var main:Component = ComponentMacros.buildComponent("assets/main-view.xml");

        var customNonModalDialogButtonRobotics = main.findComponent("customNonModalDialogButtonRobotics", Button);
            customNonModalDialogButtonRobotics.onClick = function(e) {

        var dialog = new CustomDialog();
            dialog.width = 800;
            dialog.show();
            }


            app.addComponent(new MainView());
            app.start();
        });
    }
}
