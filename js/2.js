var datiContent=[]
var datiRandomNumber
var datiQuiz
var  optionDan
var answerIndex
var scole=0
var flag=false
var num=10
var datiContentText
var t

$.get("jiazhao.json",function (res) {
    datiContent = res
    console.log(res)
})


function render(){
    clearTimeout(t)

    datiRandomNumber =parseInt(Math.random()*(datiContent.length))
    datiContentText=datiContent.splice(datiRandomNumber,1)[0]
    // console.log(datiContent[datiRandomNumber])
    datiQuiz=datiContentText.question
    optionDan=datiContentText.options
    answerIndex=datiContentText.answer

    $(".gaming").addClass("active")
    $(".timu").html(datiQuiz)
    $(".options").append(
        `
    <div data-index="0">1. ${datiContentText.item1}</div>
    <div data-index="1">2. ${datiContentText.item2}</div>
    <div data-index="2">3. ${datiContentText.item3}</div>
    <div data-index="3">4. ${datiContentText.item4}</div>
    `
    )

    t=setTimeout(function (e) {
        num--
        if(num==0){
            $(".endGame").addClass("active")
            $(".score").html(scole*10)
        }else{
            $(".options").html("")
            render();
            flag=false
        }
    },10000)

}

$(".startBtn").click(function (e) {
    render()
})

$(".options").click(function (e) {
    if(!flag){
        var index=parseInt(e.target.dataset.index)
        if(index==answerIndex-1){
            scole++
            $('[data-index='+index+']').addClass("correct")
        }else{
            $('[data-index='+(answerIndex-1)+']').addClass("correct")
            $('[data-index='+index+']').addClass("error")
        }
        num--
        flag=true

        setTimeout(function (e) {
            if(num==0){
                $(".endGame").addClass("active")
                $(".score").html(scole*10)

            }else{
                $(".options").html("")
                render();
                flag=false
            }
        },1000)
    }
})


$(".reStart").click(function (e) {
    location.reload()
})









