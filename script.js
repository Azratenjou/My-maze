// Resize canvas dynamically
function resizeMazeCanvas(){
    const canvas=document.getElementById("mazeCanvas");
    const size=Math.min(window.innerWidth*0.9,400);
    canvas.width=size;
    canvas.height=size;
}
window.addEventListener("resize",resizeMazeCanvas);
resizeMazeCanvas();

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

// MAZE GAME
const canvas=document.getElementById("mazeCanvas");
const ctx=canvas.getContext("2d");
const size=32;

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

let player={x:0,y:0}, goal={x:9,y:9};
let moving=false;

function draw(){
ctx.clearRect(0,0,320,320);
for(let y=0;y<10;y++){
for(let x=0;x<10;x++){
if(maze[y][x]===1){
ctx.fillStyle="#ff66b2";
ctx.fillRect(x*size,y*size,size,size);
ctx.shadowColor="#ff66b2";
ctx.shadowBlur=10;
}
}
}
ctx.font="24px Arial";
ctx.fillText("👩",player.x*size+6,player.y*size+24);
ctx.fillText("👨",goal.x*size+6,goal.y*size+24);
}

function movePlayer(dx,dy){
if(moving) return;
let newX=player.x+dx,newY=player.y+dy;
if(newX>=0 && newX<10 && newY>=0 && newY<10 && maze[newY][newX]===0){
moving=true;
let steps=0;
const interval=setInterval(()=>{
player.x+=(dx!=0)?dx/1:0;
player.y+=(dy!=0)?dy/1:0;
draw();
steps++;
if(steps>=1){clearInterval(interval);moving=false;checkWin();}
},100);
}
}

function checkWin(){
if(player.x===goal.x && player.y===goal.y){
mazeScreen.classList.remove("active");
setTimeout(()=>{hugScreen.classList.add("active");flowerRain();},500);
setTimeout(()=>{hugScreen.classList.remove("active");showMessage();},3000);
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

// SHOW LOVE MESSAGE WITH TYPING
const message=`My darling Jessa,

Yipppieee you reached the end of this little maze baby, and just like that, life has many paths, twists, and turns—but no matter what, we will always find our way back to each other hehe. Every time I think of your smile, my heart feels lighter; every time I hear your voice, my worries disappear. You are my sunshine on cloudy days, my calm in the storm, and my joy in every little moment.

Even if we are far apart, kahit na malayo ka and nakakapagtampo yun ahh kasi hindi kita mayakap yakap and ma kiss☹️☹️ pero okay lang, when the time comes I will give you lots of kisses and hugs my darling and, I hope you always remember that you have a special place in my heart that no one else can touch. I made this game to make you smile, to show you that I’ll always be there, cheering for you, laughing with you, dreaming of our moments together, and makabawi kahit papaano kasi lagi na lang kitang natutulugan hehe.

You are my darling, my muse, my baby, my forever, and my everything. Thank you for being you, and for letting me love you. I love you more than words could ever fully express, and I will always cherish every moment we share my darling. 🥹🥹🥹`;

function showMessage(){
messageScreen.classList.add("active");
let i=0;
const interval=setInterval(()=>{
loveMessage.innerHTML+=message.charAt(i);
i++;
if(i>=message.length) clearInterval(interval);
},35);
}

draw();

// ARROW KEY CONTROL
document.addEventListener("keydown", function(e){
  if(e.key==="ArrowUp") movePlayer(0,-1);
  if(e.key==="ArrowRight") movePlayer(1,0);
  if(e.key==="ArrowLeft") movePlayer(-1,0);
  if(e.key==="ArrowDown") movePlayer(0,1);
});