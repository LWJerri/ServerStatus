import "@girs/gjs";
import { Extension, type ConsoleLike } from "@girs/gnome-shell/extensions/extension";
import "@girs/gnome-shell/extensions/global";
import { panelMenu } from "@girs/gnome-shell/ui";
import { panel } from "@girs/gnome-shell/ui/main";
import St from "@girs/st-16";

export default class ExampleExtension extends Extension {
  private _indicator: panelMenu.Button | null = null;
  private _console: ConsoleLike | null = null;

  override enable() {
    if (this._indicator !== null) {
      return;
    }

    this._indicator = new panelMenu.Button(0.0, this.metadata.name, false);

    const icon = new St.Icon({
      iconName: "face-laugh-symbolic",
      styleClass: "system-status-icon",
    });
    this._indicator.add_child(icon);

    panel.addToStatusArea(this.uuid, this._indicator);

    this._console = this.getLogger();
    this._console?.log("Hello from the example extension");
  }

  override disable() {
    this._indicator?.destroy();
    this._indicator = null;
    this._console = null;
  }
}
