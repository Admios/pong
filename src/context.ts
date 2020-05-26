export default class Context{
  root: HTMLElement;
  
  constructor(root: HTMLElement = document.body) {
    this.root = root;
  }
}