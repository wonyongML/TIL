function my_func() {
    // 사용자가 입력한 날짜를 가져와서
    // 해당 날짜에 대한 boxoffice 순위를 알려주는 서버쪽 웹 프로그램 호출
    // 그 결과를 화면에 출력
    let user_date = $('#userInputDate').val()
    let user_key = '1f32efc9514b82814ba7ee4d9c0fd826'
    let open_api = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json'

    //let my_url = open_api + '?key='+user_key +'&targetDt='+user_date

    // 이렇게 하면 화면 refresh가 일어나서 원하는 작업을 할 수 없다
    // location.href = my_url

    // 이문제를 해결하기 위해서 JavaScript가 가지고 있는 특별한 통신방식
    // AJAX 통신방식을 이용해서 이 문제를 해결해 보아요
    // 순수 JavaScript의 AJAX 코드가 구현하기 너무 어렵고 힘들기 때문에
    // jQuery를 이용해서 AJAX 구현
    $.ajax({
        url : open_api,    // 호출할 서버쪽 프로그램의 URL
        type : 'GET',      // 서버쪽 프로그램에 대한 request 방식
        dataType : 'json', // 서버프로그램이 결과로 보내주는 데이터의 형식(json)
        data : {
            key : user_key,
            targetDt : user_date
        },
        success : function(result) {
            //alert("서버호출성공!!")

            //서버로부터 결과json을 받아왔어요
            // json은 단순 문자열=> 사용하기 쉽지 않다
            // json =>javascript 객체로 변환
            let movie_list = result['boxOfficeResult']['dailyBoxOfficeList']
            for(let i=0; i<movie_list.length; i++){
                //console.log(movie_list[i].movieNm)
                let m_name = movie_list[i].movieNm
                let m_rank = movie_list[i].rank
                let m_sales = movie_list[i].salesAcc
                let m_openDt = movie_list[i].openDt
                let m_audi = movie_list[i].audiAcc
                //  <tr>
                //     <td>1,001</td>
                //     <td>Lorem</td>
                //     <td>ipsum</td>
                //     <td>dolor</td>
                //     <td>sit</td>
                //  </tr>
                let tr =$('<tr></tr>')
                let rank_td = $('<td></td>').text(m_rank)
                let title_td = $('<td></td>').text(m_name)
                let audi_td = $('<td></td>').text(m_audi)
                let sales_td = $('<td></td>').text(m_sales)
                let open_td =$('<td></td>').text(m_openDt)
                tr.append(rank_td)
                tr.append(title_td)
                tr.append(audi_td)
                tr.append(sales_td)
                tr.append(open_td)
                $('#my_tbody').append(tr)


            }
        },

        error : function() {
            alert('먼가 이상해요!!!')
        }
    })



}