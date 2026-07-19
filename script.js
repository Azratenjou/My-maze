
// AUDIO
const bgMusic=document.getElementById("bgMusic");

// SCREENS
const intro=document.getElementById("intro");
const mazeScreen=document.getElementById("mazeScreen");
const hugScreen=document.getElementById("hugScreen");
const messageScreen=document.getElementById("messageScreen");
const loveMessage=document.getElementById("loveMessage");

// YES BUTTON
document.getElementById("yesBtn").onclick=()=>{
  bgMusic.play();
  intro.classList.remove("active");
  setTimeout(()=>mazeScreen.classList.add("active"),500);
}

// NO BUTTON MOVES
const noBtn=document.getElementById("noBtn");
function moveButton(){
  const w=noBtn.offsetWidth, h=noBtn.offsetHeight;
  const maxX=window.innerWidth-w;
  const maxY=window.innerHeight-h;
  noBtn.style.position="absolute";
  noBtn.style.left=Math.random()*maxX+"px";
  noBtn.style.top=Math.random()*maxY+"px";
}
noBtn.addEventListener("mouseover",moveButton);
noBtn.addEventListener("click",e=>{e.preventDefault();moveButton();});

// MAZE SETUP
const canvas=document.getElementById("mazeCanvas");
const ctx=canvas.getContext("2d");
let player={x:0,y:0}, goal={x:9,y:9};
let moving=false;

const maze=[
[0,0,1,0,0,0,0,1,0,0],
[0,1,1,0,1,1,0,1,0,0],
[0,0,0,0,0,1,0,0,0,1],
[1,1,0,1,0,1,1,1,0,0],
[0,0,0,1,0,0,0,1,0,1],
[0,1,0,1,1,1,0,1,0,0],
[0,1,0,0,0,1,0,0,0,0],
[0,1,1,1,0,1,1,1,1,0],
[0,0,0,1,0,0,0,0,1,0],
[1,1,0,0,0,1,1,0,0,0]
];

// RESIZE CANVAS DYNAMICALLY
function resizeCanvas(){
    const size=Math.min(window.innerWidth*0.9,400);
    canvas.width=size;
    canvas.height=size;
    drawMaze();
}
window.addEventListener("resize",resizeCanvas);
resizeCanvas();

// DRAW MAZE
function drawMaze(){
    const cellSize = canvas.width/10;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let y=0;y<10;y++){
        for(let x=0;x<10;x++){
            if(maze[y][x]===1){
                ctx.fillStyle="#ff66b2";
                ctx.fillRect(x*cellSize,y*cellSize,cellSize,cellSize);
                ctx.shadowColor="#ff66b2";
                ctx.shadowBlur=10;
            }
        }
    }
    ctx.font=cellSize + "px Arial";
    ctx.fillText("👩", player.x*cellSize, player.y*cellSize + cellSize*0.75);
    ctx.fillText("👨", goal.x*cellSize, goal.y*cellSize + cellSize*0.75);
}

// MOVE PLAYER
function movePlayer(dx,dy){
    if(moving) return;
    let newX=player.x+dx,newY=player.y+dy;
    if(newX>=0 && newX<10 && newY>=0 && newY<10 && maze[newY][newX]===0){
        moving=true;
        player.x=newX;
        player.y=newY;
        drawMaze();
        moving=false;
        checkWin();
    }
}

// KEYBOARD CONTROL
document.addEventListener("keydown",function(e){
    if(e.key==="ArrowUp") movePlayer(0,-1);
    if(e.key==="ArrowDown") movePlayer(0,1);
    if(e.key==="ArrowLeft") movePlayer(-1,0);
    if(e.key==="ArrowRight") movePlayer(1,0);
});

// CHECK WIN
function checkWin(){
    if(player.x===goal.x && player.y===goal.y){
        mazeScreen.classList.remove("active");
        setTimeout(()=>{
            hugScreen.classList.add("active");
            flowerRain();
        },500);
        setTimeout(()=>{
            hugScreen.classList.remove("active");
            showMessage();
        },3000);
    }
}

// FLOWER + HEARTS RAIN
function flowerRain(){
    setInterval(()=>{
        let flower=document.createElement("div");
        flower.innerHTML="🌸";
        flower.className="heartFloat";
        flower.style.left=Math.random()*100+"vw";
        document.body.appendChild(flower);
        setTimeout(()=>flower.remove(),6000);
    },300);

    setInterval(()=>{
        let heart=document.createElement("div");
        heart.innerHTML="💗";
        heart.className="heartFloat";
        heart.style.left=Math.random()*100+"vw";
        document.body.appendChild(heart);
        setTimeout(()=>heart.remove(),6000);
    },800);
}

// LOVE MESSAGE
const message=`

Yipppieee you reached the end of this little maze mahal, and just like that, life has many paths, twists, and turns—but no matter what, we will always find our way back to each other hehe. Every time I think of your smile, my heart feels lighter; every time I hear your voice, my worries disappear. You are my sunshine on cloudy days, my calm in the storm, and my joy in every little moment.

Even if we are far apart, kahit na malayo ka and nakakapagtampo yun ahh kasi hindi kita mayakap yakap and ma kiss☹️☹️ pero okay lang, when the time comes I will give you lots of kisses and hugs my tofu and, I hope you always remember that you have a special place in my heart that no one else can touch. I made this game to make you smile, to show you that I’ll always be there, cheering for you, laughing with you, dreaming of our moments together.

You are my mahal, my forever, and my everything. Thank you for being you, and for letting me love you. aishiteru more than words could ever fully express, and I will always cherish every moment we share my tofu. 🥹🥹🥹`;

function showMessage(){
    messageScreen.classList.add("active");
    let i=0;
    const interval=setInterval(()=>{
        loveMessage.innerHTML+=message.charAt(i);
        i++;
        if(i>=message.length) clearInterval(interval);
    },35);
}
