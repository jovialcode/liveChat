# 해야할일
1. 내가 보낸 메세지와 남이 보낸 메세지 왼/오른쪽 구분
2. 관리자 계정
3. room 스키마 정의 해서 관리 페이지 만들기
4. 화면에서 보이는건 밑에서 위로 메세지가 들어가야함
5. 개발환경 자동 셋팅 iaas
    - 이거 config ansible task로 뺄 것
6. babel 또는 parcel 셋팅
7. pm2 + cluster, redis sub/pub 로 셋팅해주시길. => 일딴 pm2 없이 작업해볼것. window에서 사용하기 불편함.
8. namespace/room/event 트래픽 격리 구분과 public/private/broadcasting 이벤트 전송 방식을 필수로 구현
9. 순수하게 process, cluster 관리할지.. 그렇다면 모니터링은 어떻게 할지?
10. 여유 되면 node를 centos에 올리던가.
11. vagrant up할 때 => 즉 서버가 내려갔다가 구동됬을 때 자동으로 각 서비스가 데몬으로 실행되어야함.
12. vagrant 로 작업했던거 docker compose로 변경해보기
13. docker compose 로 된거 kubernates로 옮겨서
14. nginx로 노드 2대 load balancing , session 처리해보기 

# 궁금한점
1. redis pub/sub는 따로 설정 없이 adapter만 해주면 가능한건강?