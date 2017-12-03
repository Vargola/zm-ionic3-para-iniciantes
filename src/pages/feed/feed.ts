import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public listaFilmes = new Array<any>();
  public page = 1;

  public loader;

  public refresher;
  public isRefreshing: boolean = false;

  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes...",
    });
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregaFilmes();
  }

  finallyLoadingRefresher() {
    this.dismissLoading();
    if (this.isRefreshing) {
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }

  carregaFilmes(newPage: boolean = false) {
    this.presentLoading();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        if (newPage) {
          this.listaFilmes = this.listaFilmes.concat((data as any).results);
          this.infiniteScroll.complete();
        }
        else {
          this.listaFilmes = (data as any).results;
        }
        this.finallyLoadingRefresher();
        console.log(this.listaFilmes);
        console.log(cookies.get('JSESSIONID'));
      },
      error => {
        this.finallyLoadingRefresher();
        console.log(error);
      }
    )
  }

  ionViewDidEnter() {
    this.carregaFilmes();
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregaFilmes(true);
  }

}
