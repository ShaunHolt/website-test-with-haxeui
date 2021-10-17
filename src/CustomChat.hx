package;

import haxe.ui.containers.dialogs.Dialog;

@:build(haxe.ui.macros.ComponentMacros.build("assets/custom-chat.xml"))
class CustomChat extends Dialog {
    public function new() {
        super();
        title = "Chat";
        modal = false;
        buttons =  DialogButton.APPLY | DialogButton.CANCEL;
    }
}
