package;

import haxe.ui.containers.dialogs.Dialog;

@:build(haxe.ui.macros.ComponentMacros.build("assets/custom-social.xml"))
class CustomSocial extends Dialog {
    public function new() {
        super();
        title = "Get Social";
        modal = false;
        buttons =  DialogButton.APPLY | DialogButton.CANCEL;
    }
}
