import * as request from 'request';
import * as mkdirp from 'mkdirp';
import * as cheerio from 'cheerio';
import { Setting } from './define/setting';
import fs = require('fs');

/**
 * 파싱 클래스
 */
export class Parser extends Setting {

  constructor() {
    super();
  }

  /**
   * 저장될 폴도 생성및 파이 저장 메인 함수
   * @param url 파싱해야할 웹사이트 주소
   */
  public scrapy(url): void {
    request(url, (err: any, response: Response, body: string) => {
      if (err) {
        console.log('error 발생');
        console.log(`${err} `);
        console.log(`다시 실행: ${url}`);
        this.scrapy(url);
      }

      let baseFolder: string = this.baseFolder;
      let $: cheerio = cheerio.load(body);
      let title: string = $('.post-content .title').text();
      let savePath: string = `${baseFolder}/${title}`;

      this.createFolder(savePath, title);
      this.saveParsingData(savePath, $);
    });
  }

  /**
   * 이미지 파일을 저장하는 함수
   * @param savePath 파일이 저장될 경로
   * @param $  cheerio형의 변수 jquery selector를 사용할수 있는 모듈
   */
  public saveParsingData(savePath: string, $: cheerio): void {
    $('.post-content p').each((idx: number, val: string) => {
      let url = $(val).find('img').attr('src');
      let options = {
        flags: 'w'
      }
      let stream = request(url);
      let writeStream = fs.createWriteStream(`${savePath}/${idx}.jpg`, options);

      stream
        .on('data', (data) => {
          writeStream.write(data);

        })
        .on('end', () => {
          console.log(`${savePath}/${idx}.jpg 다운로드완료`);
          writeStream.end();

        })
        .on('error', (error) => {
          console.log(`${error}발생 10초후에 같은 파일 다시 다운로드`);
          writeStream.close();
          setTimeout(() => {
            this.saveParsingData(savePath, $);
          }, 10000);
        });

    });
  }

  /**
     * create download folder
     * @param saveFolder => download full uri
     * explanation: async mode => mkdirp(path, callback);
     *              sync mode mkdirp(path);
     */
  public createFolder(saveFolder, title) {
    if (fs.existsSync(saveFolder)) {
      console.log(`${title} 폴더는 이미 생성되어 있습니다.`);
    } else {
      console.log(`${title} 폴더 생성`);
      mkdirp.sync(saveFolder);
    }
    fs.closeSync;
  }

}
