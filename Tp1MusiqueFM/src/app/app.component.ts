import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tp1MusiqueFM';
  result = false;
  artist: string = "";
  albums: { name: string, image: string }[] = [];
  musiques: string[] = [];
  apiKey: string = "9a8a3facebbccaf363bb9fd68fa37abf";

  constructor(public http: HttpClient) { }

  async searchArtist(): Promise<void> {
    this.result = true;
    let rechercheAlbum = await lastValueFrom(this.http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + this.artist + "&api_key=" + this.apiKey + "&format=json"));
    this.albums = [];
    console.log(rechercheAlbum)


    for (let i = 0; i < rechercheAlbum.topalbums.album.length; i++) {
      const album = rechercheAlbum.topalbums.album[i];
      this.albums.push({
        name: album.name,
        image: album.image[3]['#text']
      });
    }
  }

}
