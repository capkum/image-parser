# image-parser
특성 웹사이트의 이미지를 원하는 로컬하드에 저장


### 개발 스팩
NodeJs: v6.9.4
typescript: 2.2.1
grunt: 1.0.1
editor: vscode
etc:  package.json참조

### 실행방법

```bash

$> npm install
$> npm run grunt
$> npm start

```

### 설명및 주의사항 
define/setting.ts에서 url,hostname을 상황에 맞게 수정<br>
parser.ts가 실질적인 파싱 역활을 함<br>
scrapy()의 title부분을 용도에 맞게 <br>
saveParsingData()가 로컬에 저장하는 함수로 여기 역시 용도에 맞게 수정 <br>
cheerio module를 사용함으로써 jquery의 selector를 사용할수있음
