(function(){
    let socket, BT, fn  = {} ;

    fn = {
        init (){
            //변수 초기화
            socket = io();
            BT = {};

            //변수 바인딩
            fn.binding();

            //이벤트 바인딩
            fn.event();
        },
        binding(){
            BT.$roomMessage = $('#roomMessages');
            BT.$name = $('#name');
        },
        event() {
            //텍스트 전송
            $("form").submit(function(e) {
                e.preventDefault();
                const $name = BT.$name;
                const $content = $('#message');

                if(!$content.val()) return alert('내용을 입력해주세요.');

                //내용 전송
                socket.emit("send message", $name.val(), $content.val());
                //초기화
                $content.val("");
                return  true;
            });

            //텍스트 수신
            socket.on("receive message", data  => {
                const nameLi = document.createElement("li");
                const contentLi = document.createElement("li");
                const roomMessages = document.getElementById("roomMessages");

                nameLi.className = 'name';
                contentLi.className = 'content';

                roomMessages.appendChild(nameLi).append(BT.$name.val());
                roomMessages.appendChild(contentLi).append(data);

                //스크롤 down Event
                BT.$roomMessage.scrollTop(BT.$roomMessage[0].scrollHeight);
            });
        }
    };
    fn.init();
})();
