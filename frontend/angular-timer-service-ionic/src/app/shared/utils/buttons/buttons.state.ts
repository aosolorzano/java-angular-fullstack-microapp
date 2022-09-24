
export class ButtonsState {

  private creatingState: boolean = false;
  private updatingState: boolean = false;

  protected setCreateButtonsState(): void {
    this.creatingState = true;
    this.updatingState = false;
  }

  protected setUpdateButtonsState(): void {
    this.creatingState = false;
    this.updatingState = true;
  }

  public isCreatingState(): boolean {
    return this.creatingState;
  }

  public isUpdatingState(): boolean {
    return this.updatingState;
  }
}
