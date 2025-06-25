class Cloud extends MovableObject {
    y = 0;
    width = 450;
    height = 300;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 2500;
        this.y = Math.random() * 0;
        this.speed = 0.05 + Math.random() * 0.1;
        this.cloudAnimation();
    }

    cloudAnimation() {
        setInterval(() => {
            this.moveLeft();
        }, 20);
        
    }

    
}