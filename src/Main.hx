package ;

import haxe.ui.HaxeUIApp;
import haxe.ui.core.Component;
import haxe.ui.macros.ComponentMacros;
import haxe.ui.Toolkit;
import haxe.ui.components.Button;
import haxe.ui.components.Image;
import haxe.ui.containers.dialogs.Dialog;
import haxe.ui.containers.dialogs.Dialog.DialogButton;
import haxe.ui.containers.dialogs.MessageBox.MessageBoxType;

class Main {
    public static function main() {
        var app = new HaxeUIApp();
        app.ready(function() {
            var main:Component = ComponentMacros.buildComponent("assets/main.xml");

            
            var customNonModalDialogButtonVideos = main.findComponent("customNonModalDialogButtonVideos", Button);
            customNonModalDialogButtonVideos.onClick = function(e) {
                var dialog = new CustomDialog();
                dialog.width = 500;
                dialog.show();
            }

            var customNonModalDialogButtonSocial = main.findComponent("customNonModalDialogButtonSocial", Button);
            customNonModalDialogButtonSocial.onClick = function(e) {
                var dialogsocial = new CustomDialog();
                dialogsocial.width = 500;
                dialogsocial.show();
            }
           
            var customNonModalDialogButtonSensors = main.findComponent("customNonModalDialogButtonSensors", Button);
            customNonModalDialogButtonSensors.onClick = function(e) {
                var dialogsensors = new CustomDialog();
                dialogsensors.width = 500;
                dialogsensors.show();
            }

            var customNonModalDialogButtonRobotics = main.findComponent("customNonModalDialogButtonRobotics", Button);
            customNonModalDialogButtonRobotics.onClick = function(e) {
                var dialogrobotics = new CustomDialog();
                dialogrobotics.width = 500;
                dialogrobotics.show();
            }

            var customNonModalDialogButtonToolbox = main.findComponent("customNonModalDialogButtonToolbox", Button);
            customNonModalDialogButtonToolbox.onClick = function(e) {
                var dialogtoolbox = new CustomDialog();
                dialogtoolbox.width = 500;
                dialogtoolbox.show();
            }

            var customNonModalDialogButtonGuides = main.findComponent("customNonModalDialogButtonGuides", Button);
            customNonModalDialogButtonGuides.onClick = function(e) {
                var dialogguides = new CustomDialog();
                dialogguides.width = 500;
                dialogguides.show();
            }

            var customNonModalDialogButtonAbout = main.findComponent("customNonModalDialogButtonAbout", Button);
            customNonModalDialogButtonAbout.onClick = function(e) {
                var dialogabout = new CustomDialog();
                dialogabout.width = 500;
                dialogabout.show();
            }

            var customNonModalDialogButtonHosting = main.findComponent("customNonModalDialogButtonHosting", Button);
            customNonModalDialogButtonHosting.onClick = function(e) {
                var dialoghosting = new CustomDialog();
                dialoghosting.width = 500;
                dialoghosting.show();
            }


            app.addComponent(main);
            app.start();
        });
    }
}
