import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartolaProvider } from '../../providers/cartola/cartola';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the AtletasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atletas',
  templateUrl: 'atletas.html',
  providers: [
    CartolaProvider,
    Camera
  ]
})
export class AtletasPage {

  img = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartolaProvider: CartolaProvider,
    private camera: Camera
  ) {
  }

  ionViewDidEnter() {
    // this.cartolaProvider.atletas().subscribe(
    //   data => {
    //     console.log(data);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
    this.cartolaProvider.tags().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.img = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        console.log(err);
      });
  }

}
