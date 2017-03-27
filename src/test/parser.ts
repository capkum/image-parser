import 'mocha';
import { Parser } from '../parser';
import { Setting } from '../define/setting';
import Q = require('q');
import path = require('path');

let chai = require('chai');
chai.should();
let urlList = new Setting().uriList();

describe('parser', () => {
  it('이미지를 다운로드 되어야된다', (done) => {
    var deferred = Q.defer();
    urlList.then((list) => {
      deferred.resolve(
        new Parser().scrapy(list[0])
      );
    });
    done();
  });

  it('다운로드 폴더가 생성되어야 한단', (done) => {
    let rootPath = path.join(__dirname, '../../img');
    let title: string = 'test';
    new Parser().createFolder(rootPath, title);
    done();
  });

});