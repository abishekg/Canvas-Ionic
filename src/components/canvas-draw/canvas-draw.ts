import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
/**
 * Generated class for the CanvasDrawComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent {

  @ViewChild('myCanvas') canvas: any;
  @ViewChild('bottom-toolbar') bottomToolBar: any;
  @ViewChild('top-toolbar') topToolBar: any;


  canvasElement: any;
  lastX: number;
  lastY: number;
  availableColours: any;
  currentColour: string = '#4e7267s';
  brushSize: number = 10;


  constructor(public platform: Platform, public renderer: Renderer, public toastCtrl:ToastController) {
    this.availableColours = [
      '#1abc9c',
      '#3498db',
      '#9b59b6',
      '#e67e22',
      '#F0F0F0',
      '#e74c3c',
      '#000000'
    ];

  }


  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    // let canvas = document.getElementById('viewport');

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');

    let ctx = this.canvasElement.getContext('2d');

    let base_image = new Image();
    base_image.src = 'assets/imgs/download.jpg';
    base_image.width = this.platform.width();
    base_image.height = this.platform.height();
    base_image.onload = function () {
      ctx.drawImage(base_image, 0, 0, base_image.width, base_image.height);
    }
  }
  changeColour(colour) {
    this.currentColour = colour;
  }

  changeSize(size) {
    this.brushSize = size;
  }

  handleStart(ev) {
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;

  }

  handleMove(ev) {
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;

  }
  clearCanvas() {
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    let base_image = new Image();
    base_image.src = 'assets/imgs/download.jpg';
    base_image.width = this.platform.width();
    base_image.height = this.platform.height();
    base_image.onload = function () {
      ctx.drawImage(base_image, 0, 0, base_image.width, base_image.height);
    }
  }

  saveImage(){
    let image = this.canvasElement.toDataURL("download/png")
    // .replace("download/png", "download/octet-stream");
    window.location.href = image;
    let toast = this.toastCtrl.create({
      message: 'Image Saved',
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

}
