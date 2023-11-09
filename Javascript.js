
function enter(){
    
    document.getElementById("but1").style.display="none";
    
    document.getElementById("details").style.display="flex";
    playersCount();
    
}
function playersCount(){
    players=document.getElementsByClassName("input");
    
    for(i=1;i<=4;i++){
        players[i].style.display="none";
    }
    for(i=1;i<=players[0].value;i++)
    {
        players[i].style.display="block";
    }
    
}

function strt(){
    players=document.getElementsByClassName("input");
    names=document.getElementsByClassName("names");
    for(let i=0;i<players[0].value;i++){
        
        names[i].style.display="flex";
        document.getElementById(`name${i}`).innerHTML=players[i+1].value;
        document.getElementById(`p${i}`).style.display="block";
    }
    ini();
    document.getElementById("intro").style.display="none";
    document.getElementById("mainDiv").style.display="flex";
}

function reset(){
    for(let i=0;i<4;i++)
    {
        document.getElementById("startBox").appendChild(document.getElementById(`p${i}`));
        
    }
    document.getElementById("placeholder").innerHTML="";
    changeChance();
    chance=0;
    changeChance();
    currPos=[]
    for(let i=0;i<players;i++){
        currPos[currPos.length]=0;
    }
    clearInterval(x);
    document.getElementById("button").disabled=false;
    
    
}
   
//Game Script
//Var init

chance=0;
currPos=[]

ladders=[7,18,23,29,34,61,71];
snakes=[31,45,41,72,86,97];
laddersDes=[12,36,62,51,96,82,90]
snakesDes=[9,6,19,43,49,2];
/*NumGrid Init*/

function ini(){
    //initialize current position.
     
        players=parseInt(players[0].value);
        for(let i=0;i<players;i++){
            currPos[currPos.length]=0;
        }
        
        gridDiv=document.getElementById("grid")
        num=100;
        for(let j=0;j<10;j++)
        {
            temp1=document.createElement("div");
            temp1.setAttribute("id",`r${j}`);
            temp1.setAttribute("class","rows")
            if(j%2!=0)
            {
                temp1.style.flexDirection="row-reverse";
            }
            gridDiv.appendChild(temp1);
            for(let i=0;i<10;i++){
                
                temp=document.createElement("div")
                temp.setAttribute("id","b"+num)
                temp.setAttribute("class","boxes")
                temp.innerHTML=`<h5>${num}</h5>`;
                if(i%2==0)
                {
                    temp.style.backgroundColor="rgb(250, 217, 175)";
                
                }
                else{
                    temp.style.backgroundColor="whitesmoke";
                }
                temp1.appendChild(temp);
                num-=1;

            }

            
        }
        

        
        
        last=document.getElementById("b100");
        last.innerHTML="<h5>Finish</h5>";
        last.style="background-color:red;color:white;";
        last.lastChild.style="top:5px;left:5px;"
        
        


        //Name init
        changeChance();
        flag=true;
    

}

function changeChance(){
    
    document.getElementById(`name${chance}`).classList.toggle("chance");
    
}

function roll(){
    
    document.getElementById("button").disabled=true;
    res=Math.floor(Math.random() * 6) + 1
    document.getElementById('placeholder').innerHTML=res;
    
    move(currPos[chance],res,`p${chance}`);
    
    
    

}
function adjust(x){
    let temp=document.getElementById(`b${x}`);
    
        pawns=temp.children;
        
        if(pawns.length==1){
            pn.style.fontSize="35px";
            
        }
        else if(st==sp){
            for(let i=1;i<pawns.length;i++){
                    pawns[i].style.fontSize="revert";
            }
            pn.style.fontSize="revert";
        }
}

function move(st,sp,pn){
    pn=document.getElementById(pn);
    sp=st+sp;
    
    x=setInterval(()=>{
        
        if(sp<=100){
        st=st+1;
        //adjust(st);
        
        let temp=document.getElementById(`b${st}`);
        pawns=temp.children;
        
        if(pawns.length==1){
            pn.style.fontSize="35px";
            
        }
        else if(st==sp){
            for(let i=1;i<pawns.length;i++){
                    pawns[i].style.fontSize="revert";
            }
            pn.style.fontSize="revert";
        }

        temp.appendChild(pn);


        if(st==sp){
            
            currPos[chance]=sp;
            clearInterval(x);
            document.getElementById("button").disabled=false;
            if(st==100){
                Win(pn);
            }
            changeChance();
            chance=(chance+1)%players;
           
            changeChance();
            checkSnakeLadder(st,pn);
            
            
        }
        

    }
    else{
            clearInterval(x);
            changeChance();
            chance=(chance+1)%players;
            changeChance();
            document.getElementById("button").disabled=false;
            
    }},500)
    
    
    
}





function checkSnakeLadder(n,e){
    if(ladders.includes(n)){
        i=ladders.indexOf(n);
        final=laddersDes[i];
        
    }
    else if(snakes.includes(n)){
        i=snakes.indexOf(n);
        final=snakesDes[i];
        
    }
    else{
        return 0
    }

        
    if(chance!=0){
        currPos[chance-1]=final;
    }
    else{
        currPos[players-1]=final;
    }

    
    x=setTimeout(()=>{

        document.getElementById(`b${final}`).appendChild(e);
        let temp=document.getElementById(`b${final}`);
        pawns=temp.children;
        
        if(pawns.length==2){
            e.style.fontSize="35px";
            
        }
        else if(pawns.length>1){
            for(let i=1;i<pawns.length;i++){
                    pawns[i].style.fontSize="revert";
            }
            e.style.fontSize="revert";
        }
    },1000)
    
}

function Win(x){
    x=x.id.replace(/[^0-9]/,"")
    
    console.log(x)
    setTimeout(()=>{window.alert("Player "+(parseInt(x)+1)+" "+ document.getElementById("name"+x).innerHTML + " Wins");reset();},500);
    
}