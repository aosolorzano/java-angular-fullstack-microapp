
export class ButtonsState {

  private creatingState: boolean = false;
  private updatingState: boolean = false;
  private detailsState: boolean  = false;

  protected setCreateButtonsState(): void {
    this.creatingState = true;
    this.updatingState = false;
    this.detailsState  = false;
  }

  protected setUpdateButtonsState(): void {
    this.creatingState = false;
    this.updatingState = true;
    this.detailsState  = false;
  }

  protected setDetailsButtonsState(): void {
    this.creatingState = false;
    this.updatingState = false;
    this.detailsState  = true;
  }

  public isCreatingState(): boolean {
    return this.creatingState;
  }

  public isUpdatingState(): boolean {
    return this.updatingState;
  }

  public isDetailsState(): boolean {
    return this.detailsState;
  }
}
