(function(){
    let socket, fn  = {};

    fn = {
        init (){
            socket = io();
            //이벤트 바인딩
            fn.event();
        },
        event() {
            //텍스트 전송
            $("form").submit(function(e) {
                e.preventDefault();
                const $name = $('#name');
                const $content = $('#message');

                //내용 전송
                socket.emit("send message", $name.val(), $content.val());
                //초기화
                $content.val("");
                return  true;
            });

            //텍스트 수신
            socket.on("receive message", data  => {
                let li = document.createElement("li");
                const roomMessages = document.getElementById("roomMessages");
                roomMessages.appendChild(li).append(data);
            });
        }
    };
    fn.init();
})();
