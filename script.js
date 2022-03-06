alert('use arrows to move paddle or use w&s for red paddle, up&down arrow for blue paddle if using keyboard')
        const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const playerOneScore = document.getElementById('player-one')
const playerTwoScore = document.getElementById('player-two')
const output = document.querySelector('.output')
const outputText = document.querySelector('h1')
//score keeping
let player1Score = 0
let player2Score = 0
canvas.width = 250
canvas.height = 250


class Ball{
    constructor(){
        this.x = canvas.width/2
        this.y = 110
        this.radius = 8
        this.color = `white`
        this.gravity = 1
        this.speed = -1
    }
    draw(){
        context.beginPath()
        context.fillStyle = this.color
        context.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        context.fill()
    }
    update(){
        this.draw()
       
        if(this.y+ this.radius >= canvas.height || this.y-this.radius <=0){
        
            this.gravity = this.gravity*-1 
           
            this.x +=this.speed 
            this.y +=this.gravity
            
        }else if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
        
            this.speed = this.speed*-1
            this.y +=this.gravity
            this.x +=this.speed
        }
            else{
            this.y +=this.gravity
            this.x +=this.speed
        }
       
        
    }

}

const ball = new Ball()
ball.draw()



class Player{
    constructor(x,color){
        this.x = x
        this.y = canvas.height/2
        this.color = color
        this.width = 5
        this.height = 40
       
    }
    draw(){
        context.fillStyle = this.color
        context.fillRect(this.x,this.y,this.width,this.height)
       
    }
    update(){
        if(playerOne.y <=0){
            playerOne.y += 1
            this.draw()
        }else if(playerOne.y + playerOne.height >= canvas.height){
            playerOne.y -= 1
        }
        else if(playerTwo.y+playerTwo.height >= canvas.height){
            playerTwo.y +=-1
            this.draw
        }else if(playerTwo.y <= 0){
            playerTwo.y +=1
            this.draw()
        }
            else{
            this.draw()
        }
       
    }
}

const playerOne = new Player(2,'red')

const playerTwo = new Player(canvas.width-7,'blue')
playerOne.draw()
playerTwo.draw()


 //playerMovement

const topBtn = document.querySelector('.top')
topBtn.addEventListener('click',()=>{
    playerOne.y -= 15
    playerOne.update()
})

const botBtn = document.querySelector('.bottom')
botBtn.addEventListener('click',()=>{
    playerOne.y += 20
    playerOne.update()
})

const topBtnRight = document.querySelector('.top1')
topBtnRight.addEventListener('click',()=>{
    playerTwo.y -= 20
    playerTwo.update()
})

const botBtnRight = document.querySelector('.bottom1')
botBtnRight.addEventListener('click',()=>{
    playerTwo.y += 20
    playerTwo.update()
})


addEventListener('keyup',({keyCode})=>{
    console.log(playerOne.y)
    switch(keyCode){
        case 87:
            playerOne.y -= 20
            playerOne.update()
           
        break
        case 83:
           playerOne.y += 20
           playerOne.update()
        break
        
        
        
    }
})

addEventListener('keyup',({keyCode})=>{
    switch(keyCode){
        case 38:
            playerTwo.y -= 14
            playerTwo.update()
        break
        case 40:
           playerTwo.y += 14
           playerTwo.update()
           
    }
})




const animate = () => {
    let game = requestAnimationFrame(animate)
    context.clearRect(0,0,canvas.width,canvas.height)
    // ball.update()
    playerOne.update()
   playerTwo.update()

 
  
   //ball detection
  
 if(ball.y-ball.radius <= playerOne.y + playerOne.height &&  ball.y+ball.radius>= playerOne.y && ball.x-ball.radius=== playerOne.x+playerOne.width){
   ball.speed = ball.speed*-1
   ball.x +=ball.speed
   ball.gravity = 1
   ball.update()
  }

if(ball.y-ball.radius <= playerTwo.y + playerTwo.height &&  ball.y>= playerTwo.y && ball.x+ball.radius===playerTwo.x ){
   ball.speed = ball.speed*-1
   ball.x += ball.speed
   ball.gravity = -1
   ball.update()
   
}

//checking Score 
if(ball.x + ball.radius >= canvas.width){
    player1Score += 1
    playerOneScore.textContent = player1Score
    if(player1Score === 10){
        
     
        outputText.textContent = 'PlayerOne Won'
        output.style.display = 'block'
        cancelAnimationFrame(game)
    }
    
}

if(ball.x-ball.radius <=0){
    player2Score +=1
    playerTwoScore.textContent = player2Score
    if(player2Score === 10){
    
       
        outputText.textContent = 'PlayerTwo Won'
        output.style.display = 'block'
        
        cancelAnimationFrame(game)
    }
}

   ball.update()
  

}

animate()