import * as path from 'path';
import * as request from 'request';
import * as cheerio from 'cheerio';

export class Setting {

  public baseFolder: string;

  constructor() {
    this.baseFolder = path.join(process.cwd(), 'img');
  }
  /**
   * @param obj url에서 scrapy대상 사이트들의 list
   * @param hostname scrapy대상 사이트 도메인
   * @param url scrapy대상 웹사이트
   * 이부분을 상용자에 맞게 수정 해야함
   * @return 해당 사이트 url을 비동기식으로 parsing 후  list로 담아 리턴한다
   */
  public uriList(): Promise<any> {
    let obj: string[] = [];
    let hostname = 'http://....';
    let url: string = 'http://.....';

    return new Promise((resolve) => {

      request(url, (err: any, response: Response, html: string) => {

        if (err) {
          console.log('해당 사이트를 확인하세요');
          throw err;
        }

        let $: cheerio = cheerio.load(html);
        $('.body-text p').each(function (i, v) {
          if (i > 0) {
            let url: string = `${hostname}${$(v).find('a').attr('href')}`;
            obj.push(url);
          }
        });
        resolve(obj);
      });

    });
  }

}
