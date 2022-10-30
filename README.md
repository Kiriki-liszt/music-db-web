# music-db-web

구글 드라이브의 Sheets에 연동된 노래책  

## 소개  

원래는 구글 sheets에 직접 노래 리스트를 작성하고, 랜덤 추천, 새로 추가한 노래 등의 기능이 있는 엑셀을 만들었었다.  
하지만 은근 보기 불편하고 접근성도 떨어지는 느낌이라 이 참에 웹 페이지 개발 연습겸 만들어보았다.  

이 웹페이지는 구글 Sheets에 작성된 노래 리스트를 JSON으로 가져와 이를 화면에 띄워준다.  
죄측의 검색창을 사용해 원하는 노래, 가수를 검색할 수 있다.  

장점 : 웹 페이지에 대해 잘 모르는 사람도 엑셀만 다룰 줄 안다면 쉽게 노래를 추가, 삭제, 관리할 수 있다.  

## 체크리스트  

[x] 구글 sheets 연동
[x] 웹 페이지 가로 너비에 따라 노래 띄워주는게 바뀐다.  
[x] 가수, 제목 검색  
[x] 가수별, 제목별, 추가일자별 내림차순 정렬  
[ ] 오름차순 정렬  
[ ] 랜덤 정렬 기능
[ ] 반응형(모바일) 기능 추가하기  
[ ] 카테고리 모아보기...?  
