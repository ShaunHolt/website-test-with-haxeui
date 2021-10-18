package;

import haxe.ui.containers.dialogs.Dialog;

@:build(haxe.ui.macros.ComponentMacros.build("assets/custom/custom-hosting.xml"))
class CustomHosting extends Dialog {
    public function new() {
        super();
        title = "Hosting";
        modal = false;
        buttons =  DialogButton.APPLY | DialogButton.CANCEL;
    }
}
