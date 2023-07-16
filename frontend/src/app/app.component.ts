import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from 'src/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  

  constructor(private socketService: SocketService, private http: HttpClient) {
    this.socketService.emitir();
  }

  ngOnInit(): void {
    this.convertUrlToBase64('https://crimex-shop.fra1.digitaloceanspaces.com/crimex-info/649c1ff7f02c8.jpg').then((data) => {
      console.log(data);
    })
  }

  convertUrlToBase64(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.get(url, { responseType: 'blob' }).subscribe(
        (response: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
