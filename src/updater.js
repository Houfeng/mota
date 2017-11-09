class Updater {

  constructor(component) {
    this.component = component;
    this.updating = false;
    this.waiting = 0;
  }

  update() {
    this.updating = true;
    const _model_ = this.component.model;
    this.component.setState({ _model_ }, () => {
      this.waiting--;
      if (this.waiting > 0) return this.update();
      this.updating = false;
    });
  }

  trigger = () => {
    this.waiting++;
    if (this.updating) return;
    this.update();
  }

}